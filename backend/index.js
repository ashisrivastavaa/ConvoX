const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/database');
const userRoute=require("./routes/userRoute");
const cookieParser=require('cookie-parser');
const messageRoute=require('./routes/messageRoute');
const cors=require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption));
// Connect to DB before starting server
connectDB();

//routes
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
