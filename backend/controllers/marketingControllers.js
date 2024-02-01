const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const leadadmins = require("../modal/marketingadmin");
const marketingadmin = require("../modal/marketingadmin");
const generateToken = require("../middlewares/generatetoken");
const { leadusers } = require("../modal/users")
const secretKey = process.env.SECRET_KEY;
const transporter = require("../middlewares/Sendemail")

const MarketingControllers = {
    MarketingAdminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body);
            //  check user exists
            const userPayload = { email, password }

            const exist = await marketingadmin.findOne({ email: email })
            if (exist) {
                // check password
                const isMatch = await bcrypt.compare(password, exist.password);
                if (isMatch) {
                    generateToken(userPayload).then((token) => {
                        res.status(200).json({
                            status: true,
                            message: "Login Successfully",
                            token: `${token}`,
                            user: exist
                        })
                    })
                }
                else {
                    res.json({ message: "invalid cradentials" })
                }
            } else {
                res.json({ message: "user doen't exists" })
            }
        } catch (error) {
            console.log("err", error);
        }
    },
    adddirectlead: async (req, res) => {
        const { name, email, password, status, address, phone, admin_id } = req.body;
        console.log(req.body);
        const mailOptions = {
            from: 'hypertonictest@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html: `<h1>Welcome ${name} ${email} ${password}</h1><p>That was easy!</p>`
        };

        try {
            const userPayload = { email, password }
            const userexists = await leadusers.findOne({ email });
            if (!userexists) {
                //  encrypt password

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                const encryptPassword = await bcrypt.hash(password, 10);
                await generateToken(userPayload)
                    .then(token => {
                        // console.log('Generated Token:', token);
                        const user = new leadusers({
                            name: name,
                            email: email,
                            password: encryptPassword,
                            token: token,
                            status: status,
                            address: address,
                            phone: phone,
                            admin_id: admin_id
                        });
                        user.save();
                        console.log(user);


                        return res.json("Admin added successfully");
                        // You can use the token as needed here
                    })
                    .catch(error => {
                        console.error('Error generating token:', error);
                    });

            } else {
                return res.json({ message: "Email already exists" });
            }
        } catch (error) {
            console.log(error);
        }
    },
    bulkadddirectlead: async (req, res) => {
        const { name, email, password, status, address, phone } = req.body;
        console.log(req.body);
        // try {
        //     const userPayload = { email, password }
        //     const userexists = await directuser.findOne({ email });
        //     if (!userexists) {
        //         //  encrypt password
        //         const encryptPassword = await bcrypt.hash(password, 10);
        //         await generateToken(userPayload)
        //             .then(token => {
        //                 // console.log('Generated Token:', token);
        //                 const user = new directuser({
        //                     name: name,
        //                     email: email,
        //                     password: encryptPassword,
        //                     token: token,
        //                     status: status,
        //                     address: address,
        //                     phone: phone,
        //                 });
        //                 user.save();
        //                 console.log(user);
        //                 return res.json("Admin added successfully");
        //                 // You can use the token as needed here
        //             })
        //             .catch(error => {
        //                 console.error('Error generating token:', error);
        //             });

        //     } else {
        //         return res.json({ message: "Email already exists" });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    },
    getdirectleads: async (req, res) => {

        try {
            const data = await leadusers.find();
            if (data) {
                res.json({ data: data, message: "admins fetch succesfully" });
            } else {
                res.json({ message: "no data found" });
            }
        } catch (error) {
            console.log(error);
        }
    },
    deletedirectlead: async (req, res) => {

        try {
            await leadusers.findOneAndDelete({ _id: req.params.id })
                .then((result) => {
                    console.log(result);
                    res.json({ message: "successfully deleted", result: result });
                })
                .catch((err) => console.log("Error", err));
        } catch (error) {
            console.log(error);
        }
    },
    editdirectlead: async (req, res) => {
        const { name, email, id, message } = req.body;
        console.log(req.body);
        try {
            const updateeddata = await leadusers.updateOne(
                { _id: id },
                { $set: req.body }
            );
            if (updateeddata) {
                const mailOptions = {
                    from: 'hypertonictest@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: 'That was easy!',
                    html: `<h1>Welcome ${name} ${email}</h1>
                    <p>Your Registration has been ${message}</p>
                    <p>That was easy!</p>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.json({ message: "data updated succesfuly" });
                console.log(updateeddata);
            } else {
                res.json({ message: "some error occured while updating data" });
            }
        } catch (error) {
            console.log("err", error);
        }
    },

};

module.exports = MarketingControllers;
