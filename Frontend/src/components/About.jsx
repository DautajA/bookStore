import React from 'react';
import Navbar from '../components/Navbar';
import aboutImage from '../assets/librari.jpg';

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <br /><br /><br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center mb-8">
          <div>
            <img src={aboutImage} alt="About Us" className="rounded-lg shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Welcome to Our Bookstore</h2>
            <p className="text-lg mb-4">
              Founded in 2020, Our Bookstore has been a cornerstone of the community, providing a wide range of books, educational materials, and cultural events. We are committed to promoting literacy and fostering a love for reading among all ages.
            </p>
            <p className="text-lg mb-4">
              Our mission is to offer a diverse selection of books, from bestsellers to niche genres, and to create a welcoming space where book lovers can explore and connect. We believe in the transformative power of literature and strive to enrich lives through the joy of reading.
            </p>
            <p className="text-lg mb-4">
              Whether you're looking for the latest fiction, scholarly works, or children's books, Our Bookstore is your destination for knowledge and inspiration. Join us in our journey to celebrate the written word and cultivate a community of lifelong learners.
            </p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
          <p className="text-lg">
            At Our Bookstore, we offer a range of services to enhance your reading experience:
          </p>
          <ul className="text-lg mt-4 list-disc list-inside">
            <li>Wide selection of books across various genres and interests</li>
            <li>Author signings and book launch events</li>
            <li>Book clubs and discussion groups</li>
            <li>Special discounts for members</li>
            <li>Online ordering and delivery options</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
