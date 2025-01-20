const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
