const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// ADMIN SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}

if (password.length < 6) {
  return res.status(400).json({ message: "Password must be at least 6 characters" });
}

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};