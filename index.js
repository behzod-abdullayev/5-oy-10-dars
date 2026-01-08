const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.config");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error-handler");

// Routerlar
const authRouter = require("./router/auth.routes");
const profileRouter = require("./router/profile.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database ulanish
connectDB();

app.use( authRouter);
app.use(profileRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});