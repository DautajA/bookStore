import express from "express";
import contactModel from "../model/contact.model.js";
const router = express.Router();

// Route for creating a contact
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newContact = new contactModel(req.body);

        await newContact.save();
        res.status(200).send("Info saved");
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send(err);
    }
});

export default router;


