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
