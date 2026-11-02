const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const { validateRegister, validateLogin } = require("./middlewares/validateRegister");
const User = require("./models/userModel");


dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;


// Database

const DB_URL = process.env.MONGODB_URL
mongoose.connect(`${DB_URL}`)

.then(()=> console.log("MongoDB Database connected!"))



// C R U D
// CREATE READ UPDATE DELETE

// Register
app.post("/register", validateRegister, async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;


    // Validate the User

    const existingUser = await User.findOne({ email })

    if(existingUser){
      return res.status(400).json({message: "User account already exist!"})
    }

    // hash the password

    const hashedPassword = await bycrypt.hash(password, 12)

    // Create a new User in our Schema

    const newUser = new User({ firstName, lastName, email, password: hashedPassword  })

    // save user on database

    await newUser.save()

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
app.post("/login", validateLogin,  async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the user

    const user = await User.findOne({ email })

    if(!user){
      return res.status(404).json({message: "Incorrect details"})
    }

    // validate the password

    const passwordsMatch = await bycrypt.compare(user.password, password)

    if(!passwordsMatch){
      return res.status(400).json({message: "incorrect details"})
    }

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
