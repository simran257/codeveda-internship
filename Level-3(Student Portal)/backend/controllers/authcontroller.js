import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER STUDENT
export const registerStudent = async (req, res) => {
try {
const {
name,
email,
password,
phone,
course
} = req.body;

if (!name || !email || !password) {
return res.status(400).json({
message: "Please fill all required fields"
});
}

const existingStudent =
await Student.findOne({ email });
if (existingStudent) {
return res.status(400).json({
message: "Student already exists"
});
}

const hashedPassword =
await bcrypt.hash(password, 10);

const student = await Student.create({
name,
email,
password: hashedPassword,
phone,
course
});

res.status(201).json({
message: "Registration successful",
student: {
id: student._id,
name: student.name,
email: student.email,
phone: student.phone,
course: student.course
}
});

} catch (error) {
res.status(500).json({
message: error.message
});
}
};

// LOGIN STUDENT

export const loginStudent = async (req, res) => {
try {
const {
email,
password
} = req.body;

if (!email || !password) {
return res.status(400).json({
message: "Email and password are required"
});
}

const student =
await Student.findOne({ email });

if (!student) {
return res.status(401).json({
message: "Invalid email or password"
});
}

const passwordMatch =
await bcrypt.compare(
password,
student.password
);

if (!passwordMatch) {
return res.status(401).json({
message: "Invalid email or password"
});
}

const token = jwt.sign(
{
id: student._id,
email: student.email
},
process.env.JWT_SECRET,
{
expiresIn: "1h"
}
);

res.json({
message: "Login successful",

token,
student: {
id: student._id,
name: student.name,
email: student.email,
phone: student.phone,
course: student.course
}
});

} catch (error) {
res.status(500).json({
message: error.message
});
}
};