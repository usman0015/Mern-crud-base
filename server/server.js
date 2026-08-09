const path = require('path');  // ← ADD THIS LINE!

const express = require('express');
const cookieParser = require("cookie-parser");

require("dotenv").config();


const connectDB = require("./config/db");

const app = express();





app.use(express.json());
app.use(cookieParser());
connectDB();


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
// router.post("/register", register);

const Product = require("./models/Product");



app.get("/",(req,res) => {
    res.send("Welcome to the MERN server!");
});
// app.get("/api/products", (req,res) => {
//     res.json([
//         {
//             name: "Nike-Shoes",
//             price: 120 
//         },
//         {
//             name: "T-Shirt",
//             price: 100
//         }
//     ])
// })

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/about', (req,res) => {
    res.json([
        "This is my MERN E-Commerce application"
    ])
});

// app.post("/api/products",(req,res) => {
//     console.log(req.body);

// res.json({

//     message: "product created successfully",
    
//     product: req.body
// });
// });


// app.post("/api/products", (req, res) => {
//     res.json({
//         message: "Product created successfully",
//         product: {
//             name: "Nike Air Max",
//             price: 150,
//             category: "Shoes"
//         }
//     });
// });

// app.put("/api/products/:id",(req,res) => {
//     console.log("product id", req.params.id);
//     console.log("New Data ", req.body);

//     res.json({
//         message : "product updated successfully",
//         id:req.params.id,
//         data:req.body
//     });
// });

app.put("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});








// app.delete("/api/products/:id",(req,res) => {
//     console.log("delete product",req.params.id);
    
//     res.json({
//         message: "product deleted successfully",
//         id:req.params.id
//     })
// })




app.delete("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});





//

// app.post("/api/products", async (req, res) => {
//     try {
//         const product = await Product.create(req.body);

//         res.status(201).json(product);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });


app.post("/api/products", async (req, res) => {
    console.log("MongoDB POST route is running");
    console.log(req.body);

    try {
        const product = await Product.create(req.body);

        console.log(product);

        res.status(201).json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});