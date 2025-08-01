"""
Flask backend for Sneha Shakya's Portfolio Website
Handles contact form submissions and Firebase integration
"""

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import logging

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../assets', template_folder='../')
CORS(app)  # Enable CORS for all routes

# Flask-Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() in ['true', 'on', '1']
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)



@app.route('/')
def index():
    """Serve the main portfolio page"""
    return render_template('index.html')

@app.route('/assets/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('../assets', path)

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Send email notification
        recipient_email = os.getenv('MAIL_RECIPIENT')
        if not recipient_email:
            raise ValueError("MAIL_RECIPIENT environment variable not set")

        msg = Message(
            subject=f"New Contact Form Submission: {data['subject']}",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[recipient_email],
            body=f"You have a new message from {data['name']} ({data['email']}):\n\n{data['message']}"
        )
        app.logger.info(f"Attempting to send email to {recipient_email}...")
        mail.send(msg)
        app.logger.info("Email sent successfully!")
        
        # Return success response
        return jsonify({
            'success': True,
            'message': 'Your message has been received. Thank you!'
        })
        
    except Exception as e:
        app.logger.error(f"Error processing contact form: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'message': 'There was an error processing your request. Please try again.'
        }), 500



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
