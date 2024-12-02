// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo or Brand */}
          <div className="w-full md:w-1/4 mb-4">
            <h1 className="text-2xl font-bold">KTS Aquarium & Exotic Pets</h1>
            <p className="mt-2">Your one-stop shop for all aquatic and exotic pet needs.</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:text-green-500">Home</Link></li>
              <li><Link to="/aboutus" className="hover:text-green-500">About Us</Link></li>
              <li><Link to="/services" className="hover:text-green-500">Services</Link></li>
              <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>KTS Aquarium and Exotic Pets</p>
            <p>10/6, Karmegam Vallagam,</p>
            <p>Palaniappa Nagar,</p>
            <p>Junction Main Road,</p>
            <p>Thiruvagoundanur Main Road,</p>
            <p>Salem-636 005</p>
            <p>Email: <a href="mailto:ktsaquariumandpets@gmail.com" className="hover:underline">ktsaquariumandpets@gmail.com</a></p>
            <p>Phone: 91500 30257</p>
          </div>

      {/* Google Map Location */}
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Find Us Here</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.3685117157574!2d78.12046987327894!3d11.668274542114375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf12082c9bd07%3A0x34881c4ba7d8330d!2sKTS%20Aquarium%20And%20Exotic%20Pets!5e0!3m2!1sen!2sin!4v1722063766334!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="KTS Aquarium and Exotic Pets Location"
            ></iframe>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Stay Connected with Us!</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} KTS Aquarium & Exotic Pets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
