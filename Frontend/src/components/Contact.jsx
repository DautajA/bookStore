import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import contact from '../assets/contact.jpg'; // Importimi i imazhit

const Contact = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [contactInfo, setContactInfo] = useState({
        contactFullname: "",
        contactEmail: "",
        contactComment: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4001/contact', contactInfo);
            console.log(response.data);
            toast.success("Message sent successfully!");
            setContactInfo({
                contactFullname: "",
                contactEmail: "",
                contactComment: ""
            });
            navigate("/");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again later.");
        }
    };

    return (
        <div>
            <div className="container-fluid mx-auto px-4 py-8 mt-[70px]"
                style={{
                    backgroundImage: `url(${contact})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '50vh',
                    Width:'100%'
                }}
            >
                <h2 className="text-3xl font-bold my-[20px] text-white text-center">Contact Us here</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg ms-[80px]">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Email</h3>
                        <p className="text-gray-700"><a href="mailto:info@ourbookstore.com" style={{ textDecoration: 'underline' }}>info@ourbookstore.com</a></p>
                    </div>
                    <div className="bg-white p-6 rounded-lg me-[80px] ">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Phone</h3>
                        <p className="text-gray-700"><a href="tel:+1 123 456 7890" style={{ textDecoration: 'underline' }}>+1 123 456 7890</a></p>
                    </div>
                </div>
            <div className="container mx-auto p-4 bg-semitransparent rounded-lg shadow-lg mt-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block"> Your fullname</label>
                        <input
                            type="text"
                            value={contactInfo.contactFullname}
                            onChange={(e) => setContactInfo({
                                ...contactInfo, contactFullname: e.target.value
                            })}
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Your email</label>
                        <input
                            type="email"
                            value={contactInfo.contactEmail}
                            onChange={(e) => setContactInfo({
                                ...contactInfo, contactEmail: e.target.value
                            })}
                            className="w-full px-3 py-2 border rounded text-black"
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className="block">Your comment</label>
                        <textarea className="form-control w-full px-3 py-2 border rounded text-black" rows="3" placeholder="Write your comment"
                            value={contactInfo.contactComment}
                            onChange={(e) => setContactInfo({
                                ...contactInfo, contactComment: e.target.value
                            })}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Send</button>
                </form>
            </div>
         </div>
        </div>
    );
};

export default Contact;

