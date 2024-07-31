const express=require("express");
const User=require("./models/user");
const path=require("path");

const cors=require("cors");

require('dotenv').config();
require("./db");

const app=express();

app.use(cors());

app.use(express.json());

// app.use("/",(req,res)=>{
//     try {
//         res.status(200).json({message:"Welcome to user management!"});
//     } catch (error) {
//         res.status(500).jsonp({message:"Internal server error"});
//     }
// });

const userRoutes=require("./routes/userRoutes");

app.use("/user",userRoutes);


// Serve static files from the 'ClientUI/dist' directory
app.use(express.static(path.join(__dirname, 'ClientUI', 'dist')));

// Catch-all route to serve the React app for any undefined routes
app.get("*", (req, res) => {
    const filePath = path.join(__dirname, 'ClientUI', 'dist', 'index.html');
    console.log("Serving file:", filePath); // Log the file path being served
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("File not found:", err); // Log the error if the file is not found
            res.status(404).send("File not found");
        }
    });
});

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("Listening to PORT :",PORT);
})
