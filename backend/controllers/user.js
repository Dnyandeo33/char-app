import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/user.js';



const userControllers = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if the email already exists
            const userExist = await User.findOne({ email: email });

            if (userExist) return res.status(400).json({
                success: false, message: 'Email already exists'
            });

            if (!name || !email || !password) return res.status(400).json({
                success: false, message: 'All fields repaired'
            });
            if (!validator.isEmail(email)) return res.status(400).json({
                success: false, message: 'Email must be valid'
            });
            if (!validator.isStrongPassword(password)) return res.status(400).json({
                success: false, message: 'Password must be strong'
            });


            // hashedPassword
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await User.create({ name, email, password: hashedPassword });
            return res.status(201).json({
                success: true,
                message: `User with ${email} has been created`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email exists
            const userExist = await User.findOne({ email: email });

            if (!userExist) return res.status(401).json({
                success: false,
                message: 'Email or password is incorrect...'
            });

            // Compare passwords
            const isValid = await bcrypt.compare(
                password,
                userExist.password
            );
            if (isValid) {
                // Generate a JWT token
                const token = jwt.sign(
                    { userExist: userExist },
                    process.env.TOKEN_ACCESS_SECRET,
                    { expiresIn: '1d' }
                );
                return res
                    .status(200)
                    .json({ success: true, name: userExist.name, token, id: userExist._id });

            } else {
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Please register first.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                err: error.message
            });
        }
    },

    findUser: async (req, res) => {
        const { id } = req.params;
        try {
            const fineUser = await User.findById(id);
            return res
                .status(200)
                .json({ success: true, user: fineUser });
        } catch (error) {
            return res.status(500).json({
                success: false,
                err: error.message
            });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find({});
            return res
                .status(200)
                .json({ success: true, users: users });
        } catch (error) {
            return res.status(500).json({
                success: false,
                err: error.message
            });
        }
    }
};

export default userControllers;
