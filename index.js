const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const { status } = require("express/lib/response");
const { validateRegister } = require("./middlewares/validateRegister");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;


// Database


mongoose.connect("mongodb+srv://dsamdave:dsamdave@cluster0.86gnnbo.mongodb.net")

.then(()=> console.log("MongoDB Database connected!"))




// C R U D
// CREATE READ UPDATE DELETE

// Register
app.post("/register", validateRegister, (req, res) => {
  try {

    console.log("Entered!!")
    const { firstName, lastName, email, password } = req.body;

    // Validate


    // Validate the User

    // hash the password

    // Create a new User in our Schema

    // save user on database

    // Send verification email

    // Send a response back
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the data

    // validate the user

    // validate the password

    // Generate tokens

    // send response

    return res.status(200).json({
      status: true,
      message: "User login successful",
      data: {
        accessToken: null,
        user: { email },
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Forgot Password
app.post("/forgot-password", (req, res) => {
  try {
    const { email } = req.body;

    // validate data

    // validate user

    // Create Access Token

    // Attach the accesstoken to link

    // Send User an Email

    return res.status(200).json({
      status: true,
      message: "Please check your email",
      data: null,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Reset Password
app.patch("/reset-password", (req, res) => {
  try {
    const { accessToken, password } = req.body;

    // validate & decode

    // find User

    // hash new password

    // save the new password

    // return res
    return res.status(200).json({
      status: true,
      message: "Password reset successful",
      data: null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Started Running ${PORT}`);
});
