const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/database');
const userRoute=require("./routes/userRoute");
const cookieParser=require('cookie-parser');
const messageRoute=require('./routes/messageRoute');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cookieParser());
// Connect to DB before starting server
connectDB();
//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
