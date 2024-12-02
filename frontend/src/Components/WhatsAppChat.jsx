
import React from 'react';

const WhatsAppChat = () => {
  return (
    <a href="https://wa.me/9150030327?text=Hi%20there!%20How%20can%20we%20help%20you%20today?" 
       className="fixed bottom-10 right-10 bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition duration-300">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 mr-2"/>
      
    </a>
  );
};

export default WhatsAppChat;
