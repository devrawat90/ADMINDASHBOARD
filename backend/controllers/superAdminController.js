const Admins = require("../modal/admins");
const marketingadmin = require("../modal/marketingadmin");
const teachers = require("../modal/teachers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const generateToken = require("../middlewares/generatetoken");
const superadminController = {
  superAdminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const superadmin = {
        username: "superadmin",
        password: "superadmin",
        role: "superadmin",
      };
      if (
        superadmin.username === username &&
        superadmin.password === password
      ) {
        jwt.sign(
          { superadmin },
          secretKey,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              res.json({ message: "token generation err" });
              console.log(err);
            } else {
              res.status(201).json({
                success: true,
                message: "Login Successful",
                token: token,
              });
            }
          }
        );
      } else {
        return res.json({
          success: false,
          message: "Invalid Username or Password",
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  },

  addAdmin: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const adminexists = await Admins.findOne({ email });
      if (!adminexists) {
        //  encrypt password
        const encryptPassword = await bcrypt.hash(password, 10);
        const admin = new Admins({
          name: name,
          email: email,
          password: encryptPassword,
        });
        await admin.save();
        return res.json("Admin added successfully");
      } else {
        return res.json({ message: "Email already exists" });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getadmins: async (req, res) => {
    try {
      const data = await Admins.find();
      if (data) {
        res.json({ data: data, message: "admins fetch succesfully" });
      } else {
        res.json({ message: "no data found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteAdmin: async (req, res) => {
    try {
      await Admins.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
          console.log(result);
          res.json({ message: "successfully deleted", result: result });
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  },
  editAdmins: async (req, res) => {
    const { name, email, id } = req.body;
    console.log(req.body);

    try {
      const updateeddata = await Admins.updateOne(
        { _id: id },
        { $set: req.body }
      );
      if (updateeddata) {
        res.json({ message: "data updated succesfuly" });
        console.log(updateeddata);
      } else {
        res.json({ message: "some error occured while updating data" });
      }
    } catch (error) {
      console.log("err", error);
    }
  },
  addleadAdmin: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const userPayload = { email, password }
      const adminexists = await marketingadmin.findOne({ email });
      if (!adminexists) {
        //  encrypt password
        const encryptPassword = await bcrypt.hash(password, 10);
        await generateToken(userPayload)
          .then(token => {
            // console.log('Generated Token:', token);
            const admin = new marketingadmin({
              name: name,
              email: email,
              password: encryptPassword,
              role: role,
              token: token
            });
            admin.save();
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
  getleadadmins: async (req, res) => {
    try {
      const data = await marketingadmin.find();
      if (data) {
        res.json({ data: data, message: "admins fetch succesfully" });
      } else {
        res.json({ message: "no data found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteleadAdmin: async (req, res) => {
    try {
      await marketingadmin
        .findOneAndDelete({ _id: req.params.id })
        .then((result) => {
          console.log(result);
          res.json({ message: "successfully deleted", result: result });
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  },
  editleadAdmins: async (req, res) => {
    const { name, email, id } = req.body;
    console.log(req.body);

    try {
      const updateeddata = await marketingadmin.updateOne(
        { _id: id },
        { $set: req.body }
      );
      if (updateeddata) {
        res.json({ message: "data updated succesfuly" });
        console.log(updateeddata);
      } else {
        res.json({ message: "some error occured while updating data" });
      }
    } catch (error) {
      console.log("err", error);
    }
  },
  addteachers: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const adminexists = await teachers.findOne({ email });
      if (!adminexists) {
        //  encrypt password
        const encryptPassword = await bcrypt.hash(password, 10);
        const admin = new teachers({
          name: name,
          email: email,
          password: encryptPassword,
          role: role,
        });
        await admin.save();
        return res.json("Admin added successfully");
      } else {
        return res.json({ message: "Email already exists" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getteachers: async (req, res) => {
    try {
      const data = await teachers.find();
      if (data) {
        res.json({ data: data, message: "admins fetch succesfully" });
      } else {
        res.json({ message: "no data found" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteteachers: async (req, res) => {
    try {
      await teachers
        .findOneAndDelete({ _id: req.params.id })
        .then((result) => {
          console.log(result);
          res.json({ message: "successfully deleted", result: result });
        })
        .catch((err) => console.log("Error", err));
    } catch (error) {
      console.log(error);
    }
  },
  editteachers: async (req, res) => {
    const { name, email, id } = req.body;
    console.log(req.body);

    try {
      const updateeddata = await teachers.updateOne(
        { _id: id },
        { $set: req.body }
      );
      if (updateeddata) {
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

module.exports = superadminController;
