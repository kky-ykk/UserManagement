const express = require("express");
const User = require("./models/user");
const path = require("path");

const cors = require("cors");

require('dotenv').config();
require("./db");

const app = express();

// Configure CORS to allow requests from specific origin
app.use(cors({
  origin: 'https://usermanagement-0idw.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

app.use(express.static(path.join(__dirname, 'ClientUI/dist')));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'ClientUI/dist/index.html')));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening to PORT :", PORT);
});
