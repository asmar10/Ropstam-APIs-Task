import User from "../../models/user/user.js";
import generatePassword from "generate-password";
import jwt from "jsonwebtoken"
import md5 from "md5"
import { sendEmail } from "../../utils/mailer.cjs";
import crypto from "crypto"
import { ethers } from "ethers";

export const signUp = async (req, res) => {
    try {
        const data = req.body;
        const ifExists = await User.findOne({ email: data.email });
        // console.log(ifExists, "------------------")
        if (!ifExists) {
            const password = generatePassword.generate({
                length: 16,
                numbers: true,
                symbols: true,
                uppercase: true,
                strict: true,
            });

            const newUser = new User({
                email: data.email,
                name: data.name,
                password: md5(password),
            });

            await newUser.save();
            let content = `Thank you for signing up! Here's your password: ${password}`;
            await sendEmail(data.email, "Welcome", content);
            res.status(200).json({
                status: true,
                message: "Signup successful",
                email: data.email,
                name: data.name,
            });
        } else {
            throw new Error("User Exists")

        }
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
        console.log(err);
    }
};

export const signIn = async (req, res) => {
    const data = req.body
    try {

        const userExists = await User.findOne({ email: data.email })

        if (userExists) {
            if (md5(data.password) == userExists.password) {
                const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ status: true, message: `welcome`, name: userExists.name, token })
            }
            else {
                throw new Error("Invalid Email or password")
            }
        }
        else {
            throw new Error("Invalid Email or password")
        }
    }
    catch (err) {
        res.status(401).json({ status: false, message: err.message })

    }
}

export const verifySignature = async (req, res) => {
    try {
        const { signedMessage, message, address } = req.body;

        console.log(signedMessage, message, address)
        const recoveredAddress = ethers.utils.verifyMessage(message, signedMessage);
        // console.log(recoveredAddress === address, "ADDRESSESSS--------------")

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            throw new Error('Invalid signature')
        }
        const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ status: true, message: `welcome`, address: recoveredAddress, token })

    } catch (err) {
        console.log(err.message)
        res.status(401).json({ status: "false", error: err.message });
    }
}

export const getMessage = async (req, res) => {
    try {
        const nonce = crypto.randomBytes(32).toString('hex');
        // console.log(nonce)
        res.status(200).send({ status: true, message: `Verify identity: ${nonce}` })

    } catch (err) {
        res.status(400).json({ status: "false", error: err.message });
    }
}

export const verifyToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    // const authAddress = req.headers.address;


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "=----")
        // console.log(decoded, "----------------------")
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime)
        if (decoded.exp < currentTime) {
            throw new Error("expired")

        } else {
            res.status(200).json({ status: "true", message: "Valid" });
        }
    } catch (err) {
        res.status(401).json({ status: "false", message: err.message });
    }
};



