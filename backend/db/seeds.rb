# This file seeds the database with initial data for users, assignments, and assignment questions.
# It is idempotent and can be run multiple times without creating duplicates.

# --- USERS ---
users = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Smith', email: 'jane@example.com' },
  { name: 'Alice Johnson', email: 'alice@example.com' },
  { name: 'Bob Brown', email: 'bob@example.com' }
]
users.each do |attrs|
  User.find_or_create_by!(email: attrs[:email]) do |user|
    user.name = attrs[:name]
  end
end

# --- ASSIGNMENTS & QUESTIONS ---
assignments_data = [
  {
    title: 'Basic Skeletal System Quiz',
    questions: [
      { content: 'Which bone is the longest in the human body?', choices: [ 'Femur', 'Tibia', 'Humerus', 'Fibula' ], correct_index: 0, points: 16 },
      { content: 'How many bones are in the adult human body?', choices: [ '206', '186', '226', '196' ], correct_index: 0, points: 16 },
      { content: 'Which part of the skull protects the brain?', choices: [ 'Cranium', 'Mandible', 'Maxilla', 'Hyoid' ], correct_index: 0, points: 16 },
      { content: 'What is the common name for the clavicle?', choices: [ 'Collarbone', 'Wishbone', 'Shoulderblade', 'Neckbone' ], correct_index: 0, points: 16 },
      { content: 'Explain the difference between compact and spongy bone tissue:', choices: nil, correct_index: nil, points: 36 }
    ]
  },
  {
    title: 'Cardiovascular System Basics',
    questions: [
      { content: 'Which chamber of the heart pumps blood to the body?', choices: [ 'Left ventricle', 'Right ventricle', 'Left atrium', 'Right atrium' ], correct_index: 0, points: 16 },
      { content: 'What is the main function of red blood cells?', choices: [ 'Carry oxygen', 'Fight infection', 'Form blood clots', 'Produce antibodies' ], correct_index: 0, points: 16 },
      { content: 'Which blood vessel carries oxygenated blood?', choices: [ 'Arteries', 'Veins', 'Capillaries', 'Venules' ], correct_index: 0, points: 16 },
      { content: 'How many chambers are in the human heart?', choices: [ '4', '2', '3', '6' ], correct_index: 0, points: 16 },
      { content: 'Describe the path of blood flow through the heart:', choices: nil, correct_index: nil, points: 36 }
    ]
  },
  {
    title: 'Digestive System Overview',
    questions: [
      { content: 'Where does chemical digestion begin?', choices: [ 'Mouth', 'Stomach', 'Small intestine', 'Esophagus' ], correct_index: 0, points: 16 },
      { content: 'Which organ produces bile?', choices: [ 'Liver', 'Pancreas', 'Gallbladder', 'Stomach' ], correct_index: 0, points: 16 },
      { content: 'What is the longest part of the digestive system?', choices: [ 'Small intestine', 'Large intestine', 'Esophagus', 'Stomach' ], correct_index: 0, points: 16 },
      { content: 'Which enzyme breaks down proteins in the stomach?', choices: [ 'Pepsin', 'Amylase', 'Lipase', 'Trypsin' ], correct_index: 0, points: 16 },
      { content: 'Explain the role of villi in the small intestine:', choices: nil, correct_index: nil, points: 36 }
    ]
  }
]

assignments_data.each do |assignment_data|
  assignment = Assignment.find_or_create_by!(title: assignment_data[:title])
  assignment_data[:questions].each do |q|
    choices_str = q[:choices]&.join(';;')
    correct_choice = q[:choices] && !q[:correct_index].nil? ? q[:choices][q[:correct_index]] : nil
    aq = AssignmentQuestion.find_or_initialize_by(
      assignment: assignment,
      question_content: q[:content]
    )
    aq.choices = choices_str
    aq.correct_choice = correct_choice
    aq.points = q[:points]
    aq.save!
  end
end

# --- USER ASSIGNMENTS ---
User.find_each do |user|
  Assignment.find_each do |assignment|
    # Avoid creating a not_yet_started record if a completed record already exists for this user/assignment
    existing = UserAssignment.find_by(user: user, assignment: assignment)
    next if existing&.status == UserAssignment::STATUSES[:complete]
    UserAssignment.find_or_create_by!(
      user: user,
      assignment: assignment,
      status: UserAssignment::STATUSES[:not_yet_started]
    )
  end
end

# --- USER ASSIGNMENT SESSION FOR FIRST USER ---
first_user = User.order(:id).first
first_assignment = Assignment.order(:id).first
if first_user && first_assignment
  user_assignment = UserAssignment.find_or_initialize_by(user: first_user, assignment: first_assignment)
  session_start = 2.hours.ago
  session_end = 1.hour.ago
  total_time = (session_end - session_start).to_i

  # Set assignment as complete and total_time_spent
  user_assignment.status = UserAssignment::STATUSES[:complete]
  user_assignment.score ||= 100
  user_assignment.total_time_spent = total_time
  user_assignment.save!

  # Create session (idempotent)
  UserAssignmentSession.where(user_assignment: user_assignment).destroy_all
  UserAssignmentSession.create!(
    user_assignment: user_assignment,
    session_start: session_start,
    session_end: session_end,
    total_time: total_time
  )

  # Create user_assignment_questions for each assignment_question (idempotent)
  assignment_questions = AssignmentQuestion.where(assignment: first_assignment)
  assignment_questions.each do |aq|
    response_value = if aq.correct_choice.present?
      aq.correct_choice
    else
      case aq.question_content
      when /difference between compact and spongy bone/i
        'Compact bone is dense and strong, while spongy bone is lighter and porous.'
      else
        'Sample correct free form response.'
      end
    end
    uaq = UserAssignmentQuestion.find_or_initialize_by(
      user_assignment: user_assignment,
      assignment_question: aq
    )
    uaq.response = response_value
    uaq.correct = true
    uaq.save!
  end
end
