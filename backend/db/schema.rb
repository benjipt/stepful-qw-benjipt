# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_06_19_212923) do
  create_table "assignment_questions", force: :cascade do |t|
    t.integer "assignment_id", null: false
    t.string "question_content"
    t.string "choices"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "correct_choice"
    t.integer "points"
    t.index ["assignment_id"], name: "index_assignment_questions_on_assignment_id"
  end

  create_table "assignments", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_assignment_questions", force: :cascade do |t|
    t.integer "user_assignment_id", null: false
    t.integer "assignment_question_id", null: false
    t.text "response"
    t.boolean "correct"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "assignment_id", null: false
    t.index ["assignment_id"], name: "index_user_assignment_questions_on_assignment_id"
    t.index ["assignment_question_id"], name: "index_user_assignment_questions_on_assignment_question_id"
    t.index ["user_assignment_id"], name: "index_user_assignment_questions_on_user_assignment_id"
  end

  create_table "user_assignment_sessions", force: :cascade do |t|
    t.integer "user_assignment_id", null: false
    t.datetime "session_start"
    t.datetime "session_end"
    t.integer "total_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_assignment_id"], name: "index_user_assignment_sessions_on_user_assignment_id"
  end

  create_table "user_assignments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "assignment_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "score"
    t.integer "total_time_spent"
    t.index ["assignment_id"], name: "index_user_assignments_on_assignment_id"
    t.index ["user_id"], name: "index_user_assignments_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "assignment_questions", "assignments"
  add_foreign_key "user_assignment_questions", "assignment_questions"
  add_foreign_key "user_assignment_questions", "assignments"
  add_foreign_key "user_assignment_questions", "user_assignments"
  add_foreign_key "user_assignment_sessions", "user_assignments"
  add_foreign_key "user_assignments", "assignments"
  add_foreign_key "user_assignments", "users"
end
