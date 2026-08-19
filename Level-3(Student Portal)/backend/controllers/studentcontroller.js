import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

// REGISTER STUDENT

export const registerStudent = async (req, res) => {
try {
const {
name,
email,
password,
phone,
course,
bio,
} = req.body;

if (!name || !email || !password) {
return res.status(400).json({
message: "Name, email and password are required",
});
}
const existingStudent = await Student.findOne({
email: email.toLowerCase().trim(),
});

if (existingStudent) {
return res.status(400).json({
message: "Email already registered",
});
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Create student
const student = await Student.create({
name: name.trim(),
email: email.toLowerCase().trim(),
password: hashedPassword,
phone: phone || "",
course: course || "",
bio: bio || "",
});

// Response without password
    
res.status(201).json({
message: "Student registered successfully ✅",
student: {
id: student._id,
name: student.name,
email: student.email,
phone: student.phone,
course: student.course,
bio: student.bio,
},
});

} catch (error) {
console.error("Registration Error:", error.message);

res.status(500).json({
message: "Registration failed",
error: error.message,
});
}
};

// LOGIN STUDENT

export const loginStudent = async (req, res) => {
try {
const {
email,
password,
} = req.body;

// Check required fields
    
if (!email || !password) {
return res.status(400).json({
message: "Email and password are required",
});
}

// Find student

const student = await Student.findOne({
email: email.toLowerCase().trim(),
});

if (!student) {
return res.status(401).json({
message: "Invalid email or password",
});
}

// Compare password
    
const passwordMatch = await bcrypt.compare(
password,
student.password
);
if (!passwordMatch) {
return res.status(401).json({
message: "Invalid email or password",
});
}

// Create JWT token
    
const token = jwt.sign(
{
id: student._id.toString(),
},
process.env.JWT_SECRET,
{
expiresIn: "1d",
}
);

// Send response
    
res.status(200).json({
message: "Login successful ✅",
token,
student: {
id: student._id,
name: student.name,
email: student.email,
phone: student.phone,
course: student.course,
bio: student.bio,
},
});
} catch (error) {
console.error("Login Error:", error.message);
res.status(500).json({
message: "Login failed",
error: error.message,
});
}
};

// GET STUDENT PROFILE

export const getProfile = async (req, res) => {
try {
const studentId = req.student.id;
const student = await Student.findById(studentId)
.select("-password");
if (!student) {
return res.status(404).json({
message: "Student not found",
});
}

res.status(200).json({
student,
});

} catch (error) {
console.error(
"Get Profile Error:",
error.message
);
res.status(500).json({
message: "Failed to get profile",
error: error.message,
});
}
};


// UPDATE STUDENT PROFILE

export const updateProfile = async (req, res) => {
try {
const {
name,
phone,
course,
bio,
} = req.body;

const studentId = req.student.id;
const student = await Student.findByIdAndUpdate(
studentId,
{
name,
phone,
course,
bio,
},
{
new: true,
runValidators: true,
}
).select("-password");

if (!student) {
return res.status(404).json({
message: "Student not found",
});
}
res.status(200).json({
message: "Profile updated successfully ✅",
student,
});
} catch (error) {
console.error(
"Update Profile Error:",
error.message
);
res.status(500).json({
message: "Failed to update profile",
error: error.message,
});
}
};