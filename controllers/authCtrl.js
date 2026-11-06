const User = require("../models/userModel");
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const handleRegister = async (req, res) => {
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
}




const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the user

    const user = await User.findOne({ email })

    if(!user){
      return res.status(404).json({message: "Incorrect details"})
    }

    // validate the password

    const passwordsMatch = await bycrypt.compare(password, user.password)

    if(!passwordsMatch){
      return res.status(400).json({message: "incorrect details"})
    }

    // Generate tokens

    const accessToken = jwt.sign(
        { id: user?._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "3h" }

    )

    const activeToken = jwt.sign(
        { id: user?._id },
        process.env.ACTIVE_TOKEN,
        { expiresIn: "3h" }

    )

    const refresh = jwt.sign(
        { id: user?._id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "3h" }

    )

    // send response

    return res.status(200).json({
      status: true,
      message: "User login successful",
      data: {
        activeToken,
        accessToken,
        refresh, 
        user,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
}


const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

   

    // validate user

    const user = await User.findOne({ email })

    // Create Access Token

        const accessToken = jwt.sign(
        { id: user?._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "3h" }

    )

    // Attach the accesstoken to link

    const webLink = `https://learn.smart-hub.academy/${accessToken}`

    // Send User an Email

    return res.status(200).json({
      status: true,
      message: "Please check your email",
      data: { webLink },
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const handleResetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // console.log( req?.user )

    // validate & decode

    // find User

    const user = await User.findOne({ email: req?.user?.email})

    // console.log({ user })

    // hash new password 

    if(!user){
        return res.status(404).json({message: "User account not found"})
    }

    console.log(password)

    const hashedPassword = await bycrypt.hash(password, 12)


    // save the new password

    console.log(password, hashedPassword)
    user.password = hashedPassword

    await user.save()

    // return res
    return res.status(200).json({
      status: true,
      message: "Password reset successful",
      data: null,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAllUser = async(req, res)=>{

}


module.exports = {
    handleRegister,
    handleLogin,
    handleForgotPassword,
    handleResetPassword,
    getAllUser
}