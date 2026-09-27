# Sneha Portfolio Website

A modern, responsive portfolio website showcasing Sneha Shakya's skills, projects, and professional experience. This portfolio features a beautiful UI with animations, dark/light mode, and a Python backend with Firebase integration.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations using AOS library
- Dark/light mode toggle
- Custom cursor effects
- Portfolio filtering by category
- Contact form with Firebase integration
- Python Flask backend API
- T his is simple and clear website that describe my profile

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- AOS Animation Library
- Typed.js for text animation
- Font Awesome icons

### Backend
- Python
- Flask
- Firebase (Firestore Database)

## Project Structure

```
Portfolio-Website/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── (project images)
├── backend/
│   ├── app.py
│   └── requirements.txt
├── index.html
└── README.md
```

## Setup Instructions

### Frontend Setup

1. Clone the repository or download the project files
2. Open `index.html` in your browser to view the website locally

### Backend Setup

1. Make sure you have Python 3.8+ installed
2. Navigate to the `backend` directory
3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Set up a Firebase project and download your credentials file
5. Rename the credentials file to `firebase-credentials.json` and place it in the `backend` directory
6. Uncomment the Firebase initialization code in `app.py`
7. Run the Flask server:
   ```
   python app.py
   ```
8. The server will start on http://localhost:5000

## Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Set up Firestore Database
3. Generate a new private key for your service account in Project Settings > Service Accounts
4. Save the JSON file as `firebase-credentials.json` in the `backend` directory
5. Update the Firebase configuration in `assets/js/main.js` with your web app's Firebase configuration

## Deployment

### Frontend Deployment
The frontend can be deployed to any static site hosting service like Netlify, GitHub Pages, or Firebase Hosting.

### Backend Deployment
The Flask backend can be deployed to services like:
- Heroku
- Google Cloud Platform
- AWS
- PythonAnywhere

## Customization

1. Replace placeholder images with your own in the `assets/images` directory
2. Update your personal information in `index.html`
3. Add your social media links
4. Update the portfolio projects with your own work

## License

This project is available for personal use.

## Contact

Sneha Shakya - snehashrikrishna2005@gmail.com
