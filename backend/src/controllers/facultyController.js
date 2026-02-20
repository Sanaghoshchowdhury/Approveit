const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        email,
        password
      }
    });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Teacher login successful",
      teacher
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { teacherLogin };
