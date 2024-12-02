import React from 'react';
import Logo from '../assets/img/Logo.png';
import WhatsAppChat from './WhatsAppChat';
const AboutUs = () => {
  return (
    <div className="bg-green-200 m-10 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="bg-green-300 p-8 shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
          <p className="text-lg mb-4">
            Welcome to KTS Aquarium & Exotic Pets, your premier destination for all your aquatic and exotic pet needs. Located in Salem, our store offers a wide variety of fish, reptiles, and other exotic animals, along with all the supplies you need to keep them happy and healthy.
          </p>
          <p className="text-lg mb-4">
            Our journey began with a passion for aquatic life and a mission to share that passion with our community. Over the years, we have grown to become a trusted name among pet enthusiasts, known for our exceptional customer service and extensive knowledge of pet care.
          </p>
          <p className="text-lg mb-4">
            At KTS Aquarium & Exotic Pets, we believe in providing not just pets, but a lifetime of companionship and joy. Our team is dedicated to helping you find the perfect pet and ensuring you have everything you need to care for your new friend. From high-quality food and supplements to tanks, cages, and accessories, we have it all.
          </p>
          <p className="text-lg mb-4">
            We also offer expert advice and support to help you create the ideal environment for your pets. Whether you are a seasoned pet owner or a beginner, we are here to assist you every step of the way.
          </p>
          <p className="text-lg mb-4">
            Thank you for choosing KTS Aquarium & Exotic Pets. We look forward to welcoming you to our store and helping you discover the joy of owning an aquatic or exotic pet.
          </p>
          <div className="text-center mt-8">
            <img 
              src={Logo} 
              alt="KTS Aquarium & Exotic Pets" 
              className="w-full h-auto max-w-lg mx-auto rounded-md shadow-lg"
            />
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              Our mission is to provide high-quality pets and pet supplies while educating and supporting our customers in their pet ownership journey. We are committed to the health and well-being of every animal in our care and strive to create a community of responsible pet owners.
            </p>
          </div>
        </div>
      </div>
      <WhatsAppChat></WhatsAppChat>
    </div>
  );
};

export default AboutUs;
