const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// STUDENT SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, rollNo, department } = req.body;

    if (!name || !email || !password || !rollNo || !department) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await prisma.student.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        rollNo,
        department,
      },
    });

    res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// STUDENT LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        rollNo: student.rollNo,
        department: student.department,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
