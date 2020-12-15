const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const complaintSchema = new mongoose.Schema({
  level: String,
  category: String,
  complaintDetail: String,
  status: String,
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    course_name: String,
    academic_year: String,
    college_name: String,
    college_id: String,
    department_name: String,
    type: String,
    complaints: [complaintSchema],
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;
