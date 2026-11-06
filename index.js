const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const routes = require("./routes/authRoutes")


dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;


// Database

const DB_URL = process.env.MONGODB_URL
mongoose.connect(`${DB_URL}`)

.then(()=> console.log("MongoDB Database connected!"))


// M = model
// V = view
// C = controllers    
// r = routes

app.use(routes)



app.listen(PORT, () => {
  console.log(`Server Started Running ${PORT}`);
});
