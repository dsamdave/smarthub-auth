const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/productSchema");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

// Database

const DB_URL = process.env.MONGODB_URL;
mongoose
  .connect(`${DB_URL}`)

  .then(() => console.log("MongoDB Database connected!"));

// C R U D

// Create

app.post("/create-product", async (req, res) => {
  const { title, price, desc, image } = req.body;

  const newProduct = new Product({ title, price, desc, image });

  await newProduct.save();

  return res.status(200).json({
    status: true,
    message: "Product created successfully",
    data: null,
  });
});

// Read

app.get("/all-products", async (req, res) => {
  const allProducts = await Product.find();

  return res.status(200).json({
    status: true,
    message: "All products returned successfully",
    data: allProducts,
  });
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  const oneProduct = await Product.findById(id);

  return res.status(200).json({
    status: true,
    message: "Product returned successfully",
    data: oneProduct,
  });
});

// Delete Request

app.delete("/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      data: null,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// PUT REQUEST

app.put("/update-product/:id", async(req, res)=>{

    const { id } = req.params
    const { title, price, desc, image } = req.body

    const updatedProduct = await Product.findByIdAndUpdate(
        id,

        { title, price, desc, image },

        { new: true }

    )

    return res.status(200).json({
        status: true,
        message: "Product updated, successfully",
        data: null
    })
})




// PATCH REQUEST

app.patch("/update-part-product/:id", async(req, res)=>{

    const { id } = req.params
    const { title, price } = req.body

    const product = await Product.findById(id)

    if(product){
        // update

        product.title = title 
        product.price = price 

        await product.save()

    }


    return res.status(200).json({
        status: true,
        message: "Product updated",
        data: null

    })

})




app.listen(PORT, () => {
  console.log(`Server Started Running ${PORT}`);
});
