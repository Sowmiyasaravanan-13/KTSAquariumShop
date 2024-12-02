import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import WhatsAppChat from '../Components/WhatsAppChat'; // Adjust the path as needed
import MetaData from '../layouts/MetaData';           // Adjust the path as needed

const Home = () => {
  const backendUrl = 'http://localhost:5001'; // Replace with your actual backend URL
  const navigate = useNavigate(); 

  const handleSeeAllClick = () => {
    navigate('/livefish'); // Navigate to the Live Fish page
  };

  return (
    <>
      <MetaData title={'Aquarium Fishes Collection'} />

      {/* Scrolling Offers Section */}
      <div className="bg-yellow-200 text-center py-4 overflow-hidden">
        <div className="marquee inline-flex space-x-10 text-black font-semibold text-lg">
          <p>Amazing Offer For Sale!!!</p>
          <p>Rs. 500 - Rs. 999 = 10% discount</p>
          <p>Rs. 1000 - Rs. 1999 = 15% discount</p>
          <p>Rs. 2000 and above = 20% discount</p>
        </div>
      </div>

      <style>
        {`
          /* Marquee effect */
          .marquee {
            animation: marquee 15s linear infinite;
          }
          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }

          /* Hover overlay */
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-size: 1.25rem;
            font-weight: bold;
            text-align: center;
            border-radius: 8px;
          }

          .image-container:hover .overlay {
            opacity: 1;
          }
        `}
      </style>

      {/* Main Content */}
      <div className="relative min-h-screen bg-white p-8 bg-cover bg-center">
        <div className=''>
          <h1 className="text-4xl font-bold text-black text-center mb-8">
            Aquarium Fishes Collection
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 px-2">
            {[
              { src: `${backendUrl}/uploads/images/ArowanaFish.jpeg`, alt: "Arowana Fish" },
              { src: `${backendUrl}/uploads/images/GoldenYellowBackLinFish.jpeg`, alt: "Golden Yellow Back Lin Fish" },
              { src: `${backendUrl}/uploads/images/AlbinoSenegalFish.jpeg`, alt: "Albino Senegal Fish" },
              { src: `${backendUrl}/uploads/images/KissingGouramiFish.jpeg`, alt: "Kissing Gourami Fish" },
              { src: `${backendUrl}/uploads/images/GuppyFishFemale.jpeg`, alt: "Guppy Fish Female" },
              { src: `${backendUrl}/uploads/images/AngelFish.jpeg`, alt: "Angel Fish" },
            ].map((fish, index) => (
              <div key={index} className="relative image-container">
                <img src={fish.src} alt={fish.alt} className="w-full h-auto rounded-lg shadow-md" />
                <div className="overlay">{fish.alt}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSeeAllClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-10 mx-auto block"
          >
            View All
          </button>

          <h1 className="text-4xl font-bold text-black text-center p-5 mb-8">
            Dog Collection
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { src: `${backendUrl}/uploads/images/GoldenRetreiver.jpeg`, alt: "Golden Retriever" },
              { src: `${backendUrl}/uploads/images/Husky.jpeg`, alt: "Husky" },
              { src: `${backendUrl}/uploads/images/GermanShepherd.jpeg`, alt: "German Shepherd" },
              { src: `${backendUrl}/uploads/images/Bulldog.jpeg`, alt: "Bulldog" },
              { src: `${backendUrl}/uploads/images/Beagle.jpeg`, alt: "Beagle" },
              { src: `${backendUrl}/uploads/images/Rottweiler.jpeg`, alt: "Rottweiler" },
            ].map((dog, index) => (
              <div key={index} className="relative image-container">
                <img src={dog.src} alt={dog.alt} className="w-full h-auto rounded-lg shadow-md" />
                <div className="overlay">{dog.alt}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/livedog')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
          >
            View All
          </button>

          <h1 className="text-4xl font-bold text-black text-center p-5 mb-8">
            Aquarium Plants & Accessories
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { src: `${backendUrl}/uploads/images/Anubiasbarteributterfly.jpeg`, alt: "Anubias Barteri Butterfly" },
              { src: `${backendUrl}/uploads/images/RS338AirPump.jpeg`, alt: "RS338 Air Pump" },
              { src: `${backendUrl}/uploads/images/RS740SubmersiblePump.jpeg`, alt: "RS740 Submersible Pump" },
              { src: `${backendUrl}/uploads/images/HamsterCage.jpeg`, alt: "Hamster Cage" },
              { src: `${backendUrl}/uploads/images/2FeetImportedTank.jpeg`, alt: "2 Feet Imported Tank" },
              { src: `${backendUrl}/uploads/images/3.5FeetImportedTank.jpeg`, alt: "3.5 Feet Imported Tank" },
              { src: `${backendUrl}/uploads/images/BudhaToyMedium.jpeg`, alt: "Budha Toy Medium" },
            ].map((accessory, index) => (
              <div key={index} className="relative image-container">
                <img src={accessory.src} alt={accessory.alt} className="w-full h-auto rounded-lg shadow-md" />
                <div className="overlay">{accessory.alt}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/fishaccessories')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
          >
            View All
          </button>
          
        </div>
      </div>

      <WhatsAppChat />
    </>
  );
};

export default Home;
