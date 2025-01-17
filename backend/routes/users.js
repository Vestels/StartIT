const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/db");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Regisztrációs endpoint
router.post("/register", async (req, res) => {
  const { email, password, userType, name, company_name, profession } =
    req.body;

  try {
    const { data: existingUserInEmployee, error: employeeError } =
      await supabase.from("Employees").select("*").eq("email", email).single();

    const { data: existingUserInEmployer, error: employerError } =
      await supabase.from("Employers").select("*").eq("email", email).single();

    if (existingUserInEmployee || existingUserInEmployer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userInsertResult;
    if (userType === "employee") {
      userInsertResult = await supabase
        .from("Employees")
        .insert([
          {
            name,
            email,
            password: hashedPassword,
            profession: profession,
          },
        ]);
    } else if (userType === "employer") {
      userInsertResult = await supabase
        .from("Employers")
        .insert([
          { company_name: company_name, email, password: hashedPassword },
        ]);
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (userInsertResult.error) {
      return res
        .status(500)
        .json({
          message: "Error inserting user",
          error: userInsertResult.error.message,
        });
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error during registration" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: employeeUser, error: employeeError } = await supabase
      .from("Employees")
      .select("*")
      .eq("email", email)
      .single();

    const { data: employerUser, error: employerError } = await supabase
      .from("Employers")
      .select("*")
      .eq("email", email)
      .single();

    const user = employeeUser || employerUser;
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email, userType: user.user_type }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error during login" });
  }
});

module.exports = router;
