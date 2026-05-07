# online Resume Builder

## Description
Resume Builder is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create and manage their resumes online, providing a streamlined interface for adding personal information, education history, work experience, and skills.

The application features a responsive design, ensuring a seamless user experience across different devices. Users can register, log in securely, and save their resume data for future editing. The data is stored in MongoDB Atlas, a cloud-hosted database service.

## Technologies Used
  Frontend: React.js, React Router, Axios, Bootstrap
  Backend: Node.js, Express.js, MongoDB, Mongoose
  

## Features
  1)User authentication (register, login, logout)
  2)Create, update, and delete resume sections
  3)Responsive design for mobile and desktop
  4)Secure data storage using MongoDB Atlas
  5)Download resume pdf and edit is available
  6)Two Professional Like Resume Formats

## Installation
To run this project locally, follow these steps:


  
  Install dependencies for both frontend and backend:

cd client
npm install
cd ../server
npm install

Set up environment variables:

Create a .env file in the backend directory.
Add your MongoDB connection URI, JWT secret, and any other necessary variables.

Start the development servers:
## Start backend server (runs on http://localhost:5000)
cd server
npm run dev

## Start frontend development server (runs on http://localhost:5173)
cd client
npm run dev
Open your browser and navigate to http://localhost:5173 to view the application.
