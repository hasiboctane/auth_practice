import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

class UserController {
    static register = async (req, res) => {
        try {
            const { name, email, password, confirm_password, tc } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            } else if (name && email && password && confirm_password && tc) {
                if (password !== confirm_password) {
                    return res.status(400).json({ message: "Password and confirm_password do not match" });
                } else {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            tc: tc
                        });
                        await newUser.save();
                        return res.status(201).json({ message: "User created successfully" });
                    } catch (error) {
                        return res.status(500).json({ message: error.message });
                    }
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await User.findOne({ email });
                if (user) {
                    const validity = await bcrypt.compare(password, user.password);
                    if (user.email === email && validity) {
                        res.status(200).json({ message: "Login successful" });
                    } else {
                        res.status(401).json({ message: "Invalid credentials" });
                    }
                } else {
                    res.status(401).json({ message: "Email has not been registered" });
                }
            } else {
                res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static getAll = async (req, res) => {
        res.send("Get all users");
    }
}
export default UserController;