from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from Models import db
from flask import render_template

app = Flask(__name__)
CORS(app)

@app.route('/register-form')
def register_form():
    return render_template('ragister.html')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/skillswap.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database with app
db.init_app(app)

@app.route('/')
def home():
    return 'Skill Swap App is running!'
def swap_form():
    return render_template('swaps.html')  # templates folder already set to frontend
    @app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # Lazy import to avoid circular imports
    from routes.users import users_bp
    from routes.swaps import swaps_bp
    # from routes.auth import auth_bp  # Include this only if you have auth.py

    # Register blueprints
    app.register_blueprint(users_bp, url_prefix='/users')
    app.register_blueprint(swaps_bp, url_prefix='/swaps')
    # app.register_blueprint(auth_bp, url_prefix='/auth')  # Optional

    # Create database tables
    with app.app_context():
        db.create_all()

    app.run(debug=True)
    @app.route('/swaps-form')
