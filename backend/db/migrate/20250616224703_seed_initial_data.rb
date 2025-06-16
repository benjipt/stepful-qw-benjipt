class SeedInitialData < ActiveRecord::Migration[8.0]
  def up
    # Create users
    [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Brown', email: 'bob@example.com' }
    ].each do |attrs|
      User.create!(attrs)
    end

    # Create assignments and store references
    skeletal_quiz = Assignment.create!(title: 'Basic Skeletal System Quiz')
    cardio_quiz = Assignment.create!(title: 'Cardiovascular System Basics')
    digestive_quiz = Assignment.create!(title: 'Digestive System Overview')

    # Skeletal System Quiz questions
    [
      ['Which bone is the longest in the human body?', 'Femur;;Tibia;;Humerus;;Fibula'],
      ['How many bones are in the adult human body?', '206;;186;;226;;196'],
      ['Which part of the skull protects the brain?', 'Cranium;;Mandible;;Maxilla;;Hyoid'],
      ['What is the common name for the clavicle?', 'Collarbone;;Wishbone;;Shoulderblade;;Neckbone'],
      ['Explain the difference between compact and spongy bone tissue:', nil]
    ].each do |content, choices|
      AssignmentQuestion.create!(
        assignment: skeletal_quiz,
        question_content: content,
        choices: choices
      )
    end

    # Cardiovascular System Basics questions
    [
      ['Which chamber of the heart pumps blood to the body?', 'Left ventricle;;Right ventricle;;Left atrium;;Right atrium'],
      ['What is the main function of red blood cells?', 'Carry oxygen;;Fight infection;;Form blood clots;;Produce antibodies'],
      ['Which blood vessel carries oxygenated blood?', 'Arteries;;Veins;;Capillaries;;Venules'],
      ['How many chambers are in the human heart?', '4;;2;;3;;6'],
      ['Describe the path of blood flow through the heart:', nil]
    ].each do |content, choices|
      AssignmentQuestion.create!(
        assignment: cardio_quiz,
        question_content: content,
        choices: choices
      )
    end

    # Digestive System Overview questions
    [
      ['Where does chemical digestion begin?', 'Mouth;;Stomach;;Small intestine;;Esophagus'],
      ['Which organ produces bile?', 'Liver;;Pancreas;;Gallbladder;;Stomach'],
      ['What is the longest part of the digestive system?', 'Small intestine;;Large intestine;;Esophagus;;Stomach'],
      ['Which enzyme breaks down proteins in the stomach?', 'Pepsin;;Amylase;;Lipase;;Trypsin'],
      ['Explain the role of villi in the small intestine:', nil]
    ].each do |content, choices|
      AssignmentQuestion.create!(
        assignment: digestive_quiz,
        question_content: content,
        choices: choices
      )
    end
  end

  def down
    AssignmentQuestion.delete_all
    Assignment.delete_all
    User.delete_all
  end
end
