const express = require("express")
const dotenv = require("dotenv")

dotenv.config()



const app = express()

app.use(express.json())


const PORT = process.env.PORT || 8080

// C R U D
// CREATE READ UPDATE DELETE

// Register
app.post("/register",(req, res)=>{

    const { firstName, lastName, email, password } = req.body

    // Validate


    // Validate the User


    // hash the password


    // Create a new User in our Schema


    // save user on database


    // Send verification email


    // Send a response back
    return res.status(201).json({
        status: true,
        message:"User created successfully",
        data: null
    })

})



// Login
app.post("/login", (req, res)=>{

    const { email, password } = req.body

    // validate the data


    // validate the user


    // validate the password


    // Generate tokens


    // send response


    return res.status(200).json({
        status: true,
        message: "User login"
    })



})


// Forgot Password
app.post("/forgot-password",(req,res)=>{

})



// Reset Password
app.patch("/reset-password",()=>{

})



app.listen(PORT, ()=>{
    console.log(`Server Started Running ${PORT}`)
})