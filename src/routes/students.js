const router = require("express").Router();
const Student = require("../models/Student");

// Add a new student
router.route("/add").post((req, res) => {
    const { name, age, address } = req.body;

    const newStudent = new Student({
        name,
        age,
        address,
    });

    newStudent
        .save()
        .then(() => res.json("Student added!"))
        .catch((err) => res.status(400).json({ error: "Error adding student", details: err.message }));
});

// Get all students
router.route("/").get((req, res) => {
    Student.find()
        .then((students) => res.json(students))
        .catch((err) => res.status(400).json({ error: "Error fetching students", details: err.message }));
});

// Update a student by ID
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { name, age, address } = req.body;

    const updatedStudent = { name, age, address };

    try {
        const update = await Student.findByIdAndUpdate(userId, updatedStudent, { new: true });
        if (update) {
            res.status(200).json({ message: "Student updated successfully", data: update });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (err) {
        res.status(400).json({ error: "Error updating student", details: err.message });
    }
});

// Delete a student by ID
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedStudent = await Student.findByIdAndDelete(userId);
        if (deletedStudent) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (err) {
        res.status(400).json({ error: "Error deleting student", details: err.message });
    }
});

// Get a student by ID
router.route("/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const student = await Student.findById(userId);
        if (student) {
            res.status(200).json({ data: student });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (err) {
        res.status(400).json({ error: "Error retrieving student", details: err.message });
    }
});

module.exports = router;
