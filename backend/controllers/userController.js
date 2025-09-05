const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists, try different" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullname,
      username,
      password: hashedPassword,
      profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender
    });

    return res.status(201).json({
      message: "Account Created Successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    return res.status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
      })
      .json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        profilephoto: user.profilephoto,
        success: true
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 const logout=(req,res)=>{
  try{
    return res.status(200).cookie('token',"",{maxAge:0}).json({
      message:"logout successfully"
    })
  }catch(error){
   console.log(error);
  }
 }
 const getOtherUsers=async(req,res)=>{
  try{
      const loggedInUserId=req.id;
      const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password"); // everything except password  $ne=noteaualto
      return res.status(200).json(otherUsers);
  }
  catch(error){
    console.log(error);
  }
 }
module.exports = { register, login,logout ,getOtherUsers};
