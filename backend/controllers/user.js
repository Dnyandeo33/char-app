import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;

            // Check if the email already exists
            const userExist = await User.findOne({ email: email });

            if (userExist) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            } else {
                // Validate email and password
                if (
                    !validateEmail(email) ||
                    !validatePassword(password) ||
                    !matchPasswords(password, rePassword)
                ) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email or password format'
                    });
                }

                // Hash the password
                const hashedPassword = hashPassword(password);

                // Create a new user
                const user = await User.create({
                    email,
                    password: hashedPassword
                });
                return res.status(201).json({
                    success: true,
                    message: `User with ${email} has been created`
                });
            }
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
            if (userExist) {
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

                    // Set cookies
                    res.cookie('_id', userExist._id, {
                        secure: true,
                        sameSite: 'None'
                    });
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None'
                    });
                    return res
                        .status(200)
                        .json({ success: true, token, id: userExist._id });
                } else {
                    return res.status(401).json({
                        success: false,
                        message: 'Email or password is incorrect'
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Please register first.'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message
            });
        }
    },
    logout: (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('_id');

        return res
            .status(200)
            .json({ success: true, message: 'User logged out successfully' });
    }
};

export default userControllers;
