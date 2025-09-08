import Users from "../models/usersModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create token with user id
const createToken = (_id) => {
    // expiresIn is set to 1 day
    // JWT_SECRET is a secret string that is used to sign the token
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};



export const getUserController = async (_, res) => {
    try {
        const user = await Users.find();
        res.status(200).json(user);

    } catch (error) {
        console.log("Error in get User controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// controller function to register users

export const singUpController = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;

        const isEmptyField = !name || !username || !password || !role;

        if (isEmptyField) {
            return res.status(200).send({
                success: false,
                message: "Please fill all the required fields"
            });
        }

        // check for already exist
        const user = await Users.findOne({ username });

        if (user) {
            return res.status(200).send({
                success: false,
                message: "Username already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({ name, username, password: hashedPassword, role });

        newUser.save();

        const token = createToken(newUser._id);

        res.status(200).send({
            auth: {
                role,
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                token: token,
            },
            success: true
        });

    } catch (error) {
        console.log("Error in SignUp controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginController = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).send({
                message: "Username or Password field is Empty",
                success: false
            });
        }

        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(200).send({
                message: "Username not found",
                success: false
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(200).send({
                message: "Password Incorrect",
                success: false
            });
        }

        const token = createToken(user._id);

        res.status(200).send({
            auth: {
                role: user.role,
                id: user._id,
                name: user.name,
                username: user.username,
                token: token,
            },
            success: true
        });

    } catch (error) {
        console.log("Error in Login controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}