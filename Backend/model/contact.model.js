import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  contactFullname: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactComment: {
    type: String,
    required: true
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;

