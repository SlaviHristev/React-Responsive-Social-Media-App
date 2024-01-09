import { db } from "../connectDb.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPass = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPass) return res.status(400).json("Wrong password or username!")

        const { password, ...others } = data[0];

        const token = jwt.sign({ id: data[0].id }, "verySecretKey");
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others)
    })
}

export const register = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!")


        const salt = await bcrypt.genSaltSync(10);
        const hashedPass = await  bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPass,
            req.body.name
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User created!");
        })
    });

}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has successfully logged out!")
}