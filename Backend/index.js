import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path"; // Sigurohuni që keni instaluar `path`
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import session from 'express-session';

import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20; // ose sa të dëshironi


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["set-cookie"],
}));

app.use(session({
  secret: "This will be secret", resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(express.json({ limit: "1000mb", extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connect to MongoDB
mongoose.connect(URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(error => {
    console.error("Error connecting to MongoDB: ", error);
});


// Defining routes
app.use(bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute); 

// Default route for handling unspecified routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
