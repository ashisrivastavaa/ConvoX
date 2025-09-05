const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/database');
const userRoute=require("./routes/userRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());

// Connect to DB before starting server
connectDB();
//routes
app.use("/api/v1/user",userRoute);
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
