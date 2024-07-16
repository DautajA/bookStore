import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import bookModel from '../model/book.model.js';

const app = express();
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });


// Create
router.post("/create", upload.single('image'), async (req, res) => {
    try {
        const newBook = new bookModel({
            ...req.body,
            image: req.file.filename
        });
        await newBook.save();
        console.log(newBook);
        res.status(200).send(newBook);
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).send("Not created: " + err);
    }
});
//Get all books
// Read All
router.get("/course", async (req, res) => {
    try {
        const books = await bookModel.find({});
        console.log(books);
        res.status(200).send(books);
    } catch (err) {
        console.error("Not read:", err);
        res.status(500).send("Not read" + err);
    }
});

//Get category 
// router.get('/books/category/:category', async (req, res) => {
//     const { category } = req.params;
//     try {
//         const books = await bookModel.find({ category: category });
//         res.status(200).send(books);
//     } catch (err) {
//         console.error('Error reading books:', err);
//         res.status(500).send('Error reading books: ' + err);
//     }
// });
router.get('/books', async (req, res) => {
    // const { category } = req.params;
    try {
        const books = await bookModel.find({});
        res.status(200).send(books);
    } catch (err) {
        console.error('Error reading books:', err);
        res.status(500).send('Error reading books: ' + err);
    }
});
// Read one
router.get("/readOne/:id", async (req, res) => {
    try {
        const idBook = req.params.id //React
        console.log("id:" + idBook)
        const book = await bookModel.findById({ _id: idBook })
        console.log(book)
        res.status(200).send(book);
    } catch (err) {
        console.error("Not read:", err);
        res.status(500).send("Not read" + err);
    }
});

// Update
router.patch("/updateOne/:id", upload.single('image'), async (req, res) => {
    try {
        const idBook = req.params.id //React
        // Tekst, numra
        const bookInfo = { ...req.body };
        // Imazhit
        if (req.file) {
            bookInfo.image = req.file.filename;
        }
        const book = await bookModel.findByIdAndUpdate(
            { _id: idBook },
            { $set: bookInfo },
            { new: true }
        )
        console.log(book)
        res.status(200).send(book);
    } catch (err) {
        console.error("Not updated:", err);
        res.status(500).send("Not updated" + err);
    }
});

// Delete
router.delete("/deleteOne/:id", async (req, res) => {
    try {
        const idBook = req.params.id //React
        await bookModel.deleteOne({ _id:idBook })
        res.status(200).send("Deleted");
    } catch (err) {
        console.error("Not deleted:", err);
        res.status(500).send("Not deleted" + err);
    }
});

export default router;
