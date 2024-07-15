const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require('dotenv').config();
const AddAdmins = require("./models/addAdmin");
const AddStudent = require("./models/addStudent");
const osarticlecoll = require("./models/osarticle");//operating system - comp
const dbmsarticlecoll = require("./models/dbmsArticle");//dbms - comp
const DEarticlecoll = require("./models/DEArticle");//digital electronics - entc
const CSarticlecoll = require("./models/CSArticle");//communication systems - entc
const thermoarticlecoll = require("./models/thermoArticle");//Thermodynamics - mech
const fluidMecharticlecoll = require("./models/fluidMechArticle");//Thermodynamics - mech
const biochemarticlecoll = require("./models/biochemArticle");//Biochemical Eng. - chem
const wasteManagearticlecoll = require("./models/wasteManageArticle");//Waste Management - chem

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 5000;

mongoose.connect("mongodb://localhost:27017/collegeGuidedb", {}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error("Error connecting to database:", err.message);
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    authMethod: 'PLAIN',
    debug: true,
});

app.get("/", (req, res) => {
    res.send("This is the server");
});

app.post("/add-student", async (req, res) => {
    console.log("Add student request arrived");
    try {
        const newStudent = new AddStudent(req.body);
        const result = await newStudent.save();
        res.json({ status: "ok", data: result });
    } catch (error) {
        console.error("Error adding Student:", error);
        res.status(500).json({ status: 'error', message: 'Failed to add Student' });
    }
});

app.post("/add-admins", async (req, res) => {
    console.log("Add admin request arrived");
    try {
        const newAdmin = new AddAdmins(req.body);
        const result = await newAdmin.save();
        res.json({ status: "ok", data: result });
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ status: 'error', message: 'Failed to add admin' });
    }
});

app.post("/check-admin-email", async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await AddAdmins.findOne({ email });
        if (admin) {
            const otp = generateOTP();
            console.log("Otp is : ", otp);
            admin.otp = otp; //If admin is registered in database then generate otp & store it in otp parameter in database
            await admin.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: admin.email,
                subject: "Verification OTP for VIT EduHub",
                text: `Your OTP for verification is ${otp}. It is valid for 10 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    res.status(500).json({ status: "error", message: "Failed to send OTP email" });
                } else {
                    console.log("Email sent: " + info.response);
                    res.json({ status: "otp_sent" });
                }
            });
        } else {
            res.json({ status: "not_registered" });
        }
    } catch (error) {
        console.error("Error checking admin:", error);
        res.status(500).json({ status: "error", message: "An error occurred while checking the admin" });
    }
});

app.post("/verify-admin-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const admin = await AddAdmins.findOne({ email });
        if (admin && admin.otp === otp) {
            admin.otp = "";
            await admin.save();
            res.json({ status: "registered" });
        } else {
            res.json({ status: "otp_invalid" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ status: "error", message: "An error occurred while verifying OTP" });
    }
});

app.post("/check-student-email", async (req, res) => {
    const { email } = req.body;
    try {
        const student = await AddStudent.findOne({ email });
        if (student) {
            const otp = generateOTP();
            console.log("Otp is : ", otp);
            student.otp = otp;
            await student.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: student.email,
                subject: "Verification OTP for VIT EduHub",
                text: `Your OTP for verification is ${otp}. It is valid for 10 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    res.status(500).json({ status: "error", message: "Failed to send OTP email" });
                } else {
                    console.log("Email sent: " + info.response);
                    res.json({ status: "otp_sent" });
                }
            });
        } else {
            res.json({ status: "not_registered" });
        }
    } catch (error) {
        console.error("Error checking student:", error);
        res.status(500).json({ status: "error", message: "An error occurred while checking the student" });
    }
});

app.post("/verify-student-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const student = await AddStudent.findOne({ email });
        if (student && student.otp === otp) {
            student.otp = "";
            await student.save();
            res.json({ status: "registered" });
        } else {
            res.json({ status: "otp_invalid" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ status: "error", message: "An error occurred while verifying OTP" });
    }
});

function generateOTP() {
    return crypto.randomBytes(3).toString("hex");
}

// COMP - Operating System
app.post("/ossavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new osarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/osfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await osarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/osdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await osarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await osarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateospost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await osarticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// COMP - DBMS
app.post("/dbmssavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new dbmsarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/dbmsfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await dbmsarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/dbmsdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await dbmsarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await dbmsarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updatedbmspost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await dbmsarticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// ENTC - Digital Electronics
app.post("/DEsavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new DEarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/DEfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await DEarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/DEdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await DEarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await DEarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateDEpost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await DEarticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// ENTC - Communication Systems
app.post("/CSsavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new CSarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/CSfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await CSarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/CSdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await CSarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await CSarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateCSpost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await CSarticlecoll.findById(req.body.id);
    if(!article)
    {
        console.log("Article not found");
    }
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// MECH - Thermodynamics
app.post("/thermosavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new thermoarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/thermofetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await thermoarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/thermodeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await thermoarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await thermoarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateThermopost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await thermoarticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// MECH - Fluid Mechanics
app.post("/fluidmechsavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new fluidMecharticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/fluidmechfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await fluidMecharticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/fluidmechdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await fluidMecharticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await fluidMecharticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateFluidMechpost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await fluidMecharticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// CHEM - Biochemical Engineering
app.post("/biochemsavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new biochemarticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/biochemfetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await biochemarticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/biochemdeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await biochemarticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await biochemarticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateBiochemEngpost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await biochemarticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

// CHEM - Waste Management
app.post("/wastemanagesavepost", async (req, res) => {
    console.log("post saved successfully");
    const response = new wasteManagearticlecoll(req.body);
    let result = await response.save();
    res.send({ status: "ok", data: result });
});

app.post("/wastemanagefetchpost", async (req, res) => {
    console.log("fetched post successfully");
    let response = await wasteManagearticlecoll.find();
    console.log(response);
    res.send({ status: "ok", data: response });
});

app.post('/wastemanagedeletepost', async (req, res) => {
    const { id, password } = req.body;
    console.log(id);
    console.log(password);
    try {
        // Fetch the blog post
        const blog = await wasteManagearticlecoll.findOne({ _id: id });
        if (!blog) {
            return res.json({ status: 'error', message: 'Blog post not found' });
        }
        if (password === blog.password) {
            // Delete the blog post
            await wasteManagearticlecoll.deleteOne({ _id: id });
            return res.json({ status: 'ok', message: 'Blog post deleted' });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 'error', message: 'An error occurred' });
    }
});

app.post("/updateWasteManagepost",async(req,res)=>{
    console.log("Body"+req.body.username);
    let article = await wasteManagearticlecoll.findById(req.body.id);
    article.username = req.body.username;
    article.blogtitle = req.body.blogtitle;
    article.blogcontent = req.body.blogcontent;
    article = await article.save();
    console.log("edited successfully");
    res.send({status:"updated",data:article});
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
