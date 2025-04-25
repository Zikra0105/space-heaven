from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql
from database import connect_db
import random
import bcrypt

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route("/submit_form", methods=["POST"])
def submit_form():
    data = request.json  # Get JSON data from frontend
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    budget = data.get("budget")
    email = data.get("email")
    phone_number = data.get("phone_number")
    country = data.get("country")
    message = data.get("message")

    conn = connect_db()
    cursor = conn.cursor()

    query = """
        INSERT INTO consultation (first_name, last_name, budget, email, phone_number, country, message) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    values = (first_name, last_name, budget, email, phone_number, country, message)
    cursor.execute(query, values)

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Booking successful!"}), 201

# Route for Contact Form
@app.route("/submit_contact", methods=["POST"])
def submit_contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    contact_number = data.get("contact_number")
    subject = data.get("subject")
    message = data.get("message")

    conn = connect_db()
    cursor = conn.cursor()

    query = """
        INSERT INTO contact (name, email, contact_number, subject, message) 
        VALUES (%s, %s, %s, %s, %s)
    """
    values = (name, email, contact_number, subject, message)
    cursor.execute(query, values)

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Contact form submitted successfully"}), 201





# Route for Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password)
        )
        conn.commit()
        return jsonify({"message": "Signup successful!"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"message": "Username or email already exists!"}), 409
    finally:
        cursor.close()
        conn.close()


# LOGIN route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
        return jsonify({"message": f"Login successful! Welcome, {username}."}), 200
    else:
        return jsonify({"message": "Invalid username or password!"}), 401
# route for chatbot
responses = {
    "hello": ["Hi there!", "Hello! How can I help you?"],
    "hii": ["Hi there!", "Hello! How can I help you?"],

    "services": [
        "We offer home interior design, decor consultations, custom furniture, and 3D design visualizations!"
    ],
    "pricing": [
        "Our pricing depends on your needs. Would you like a free quote? Type Yes or No",
        "You can also use our Free Quote Estimation Module for an instant cost estimate."
    ],
    "bye": ["Goodbye! Have a great day!", "See you again!"],
    "living room": [
        "Soft pastels create a cozy feel, while bold contrasts like navy and gold add a modern touch.",
        "Neutral tones like beige and gray are timeless choices for a living room."
    ],
    "small room": [
        "Use light colors, add mirrors, and choose multi-functional furniture to make a small room look bigger.",
        "Keeping the décor minimal and using vertical storage can also create a spacious feel."
    ],
    "lighting": [
        "Warm white lights and layered lighting (ambient, task, and accent) help create a cozy atmosphere.",
        "Dimmable lights and pendant lighting can add style and comfort to your space."
    ],
    "flooring": [
        "Hardwood, laminate, and large-format tiles work great for a modern aesthetic.",
        "Consider durability and maintenance when choosing the right flooring for your space."
    ],
    "consultation": [
        "Yes! We provide a free initial consultation to understand your style and needs. You can book it online."
    ],
    "quote": [
        "Yes! Use our Free Quote Estimation Module to get an instant estimate based on your room size and design preferences."
    ],
    "timeline": [
        "A single-room makeover may take 2-3 weeks, while a full-home renovation can take 2-3 months."
    ],
    "3d design": [
        "Yes! We provide 3D visualizations so you can see the final design before implementation."
    ],
    "custom furniture": [
        "Absolutely! We can create custom furniture tailored to your space and preferences."
    ],
    "revisions": [
        "We offer revisions during the design process to ensure you love the result before execution."
    ],
    "project tracking": [
        "We provide regular updates and allow you to track progress via your customer dashboard."
    ],
    "refunds": [
        "We allow modifications within 7 days of installation. Refund policies depend on the scope of the change."
    ],
    "budget-friendly": [
        "Yes! We work with different budgets and can suggest cost-effective solutions without compromising style."
    ],
    "trends": [
        "Some trending styles include Japandi (minimalist + Japanese + Scandinavian), biophilic design, and warm neutrals."
    ],
    "portfolio": [
        "Of course! Visit our Room Inspiration Module to explore our past projects."
    ],
    "modern and traditional": [
        "Use classic furniture with modern accents, balance neutral tones with vintage patterns, and mix materials like wood and metal."
    ]
}

def chatbot_response(message):
    message = message.lower()
    for key in responses:
        if key in message:
            return random.choice(responses[key])
    return "I'm not sure, but I can connect you with an expert!"

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():

    if request.method == "OPTIONS":
        # Handle preflight request for CORS
        return jsonify({"message": "CORS preflight response"}), 200

    data = request.json
    user_message = data.get("message", "")
    return jsonify({"response": chatbot_response(user_message)})

# checkout
@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.json
    username = data.get("username")
    name = data.get("name")
    email = data.get("email")
    address = data.get("address")
    payment_method = data.get("payment")
    total_items = data.get("total_items")
    total_price = data.get("total_price")

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO orders (username, name, email, address, payment_method, total_items, total_price)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (username, name, email, address, payment_method, total_items, total_price))
        conn.commit()
        return jsonify({"message": "Order stored successfully!"}), 201
    except Exception as e:
        print("Error storing order:", e)
        return jsonify({"message": "Failed to store order."}), 500
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)