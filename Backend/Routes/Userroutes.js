

const express=require("express")
const {UserModel} =require("../Models/User.model")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authMiddleware}= require("../Middleware/Authmiddleware")

userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
    
        if (username.length < 3 || username.length > 30) {
            return res.status(400).json({ error: "Username must be between 3 and 30 characters" });
        }

       
        if (email.length === 0 || email.length > 255) {
            return res.status(400).json({ error: "Email must not be empty and must be less than 255 characters" });
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

       
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

       
        const user = new UserModel({
            username,
            email,
            password: hashedPassword 
        });

       
        await user.save();

        res.status(200).json({ message: "New user registered" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userID: user._id, username: user.username }, process.env.KEY);
        res.status(200).json({ msg: "Login successful", token: token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports={
    userRouter
}