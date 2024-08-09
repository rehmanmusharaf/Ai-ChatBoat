const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./baseconnect");
const cors = require("cors"); // Require the 'cors' module
const sendToken = require("./utils/sendtoken");
const { default: runChat } = require("./config/gemini");
// Create Express application
const app = express();

require("dotenv").config(); // Define CORS options
// const corsOptions = {
//   origin: "http://localhost:5173", // Allow requests from this origin
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
//   optionsSuccessStatus: 200, // Legacy support for certain browsers
// };
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  credentials: true, // Allow credentials (cookies) to be sent
};
// Use CORS middleware with options
app.use(cors(corsOptions));

// Serve static files from the "frontend" directory
// app.use(
//   express.static(path.join(__dirname, "C:UsershpDesktopChatApp\frontend"))
// );

// This will serve your static HTML file for any route that isn't explicitly handled by other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', 'src', 'pages', 'Signup.jsx'));
// });

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to render login form
// app.get("/login", (req, res) => {
//   res.send("Login"); // Assuming you have a Login.ejs or Login.html file in your views directory
// });

// Route to render signup form
// app.get("/signup", (req, res) => {
//   res.render("signup"); // Assuming you have a signup.ejs or signup.html file in your views directory
// });

// Route to register a user
app.post("/signup", async (req, res) => {
  try {
    // console.log("signup api end point hit?");
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the saltRounds value

    // Create a new user object with the username and hashed password
    const newUser = {
      name: req.body.username,
      password: hashedPassword,
    };

    // Insert the new user document into the collection
    const result = await collection.create(newUser);

    // console.log("User registered successfully:", result);
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});
app.post("/login", async (req, res) => {
  try {
    console.log("login api end point hit?");
    // Hash the password before storing it in the database
    const { email, password } = req.body;
    // Create a new user object with the username and hashed password
    const newUser = {
      name: email,
      password: password,
    };

    // Insert the new user document into the collection
    const user = await collection.findOne({ name: email });
    // console.log("user is:", user);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Credentials" });
    }

    const validate = await bcrypt.compare(password, user.password);
    // console.log("bcrypt comparison result : ", validate);

    if (!validate) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    sendToken(user, 200, res);
    // console.log("User registered successfully:", result);
    // res.status(200).send({success:true,message:"User logged in Successfully!"});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});
app.post("/api/gemini", (req, res) => {
  try {
    runChat(req.body.prompt);
  } catch (error) {}
});
// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});