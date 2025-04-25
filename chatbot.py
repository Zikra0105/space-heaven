from flask import Flask, request, jsonify
from flask_cors import CORS
# from transformers import pipeline
# import openai
import random

app = Flask(__name__)
# CORS(app)  # This will allow all domains to access your Flask server
CORS(app, resources={r"/chat": {"origins": "*"}}, supports_credentials=True)

# openai.api_key = "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"
# client = openai.OpenAI(api_key="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")
# generator = pipeline("text-generation", model="gpt2")

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



# def chatbot_response(message):
#     message = message.lower()

#     # First check the predefined responses for any matches
#     for key in responses:
#         if key in message:
#             return random.choice(responses[key])
def chatbot_response(message):
    message = message.lower()
    for key in responses:
        if key in message:
            return random.choice(responses[key])
    return "I'm not sure, but I can connect you with an expert!"
    
    # If no predefined response found, send the message to OpenAI for a random answer
   
    # try:
    #     response = client.chat.completions.create(
    #         model="gpt-3.5-turbo",  # Use "gpt-4" if available
    #         messages=[{"role": "system", "content": "You are a helpful AI assistant."},
    #                   {"role": "user", "content": message}],
    #         max_tokens=150,
    #         temperature=0.7
    #     )
    #     return response["choices"][0]["message"]["content"].strip()
    # except Exception as e:
    #     return f"Sorry, there was an error: {e}"
    # try:
    #     ai_response = generator(message, max_length=100, num_return_sequences=1)
    #     return ai_response[0]["generated_text"].strip()
    # except Exception as e:
    #     return f"Sorry, an error occurred: {e}"

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():

    if request.method == "OPTIONS":
        # Handle preflight request for CORS
        return jsonify({"message": "CORS preflight response"}), 200

    data = request.json
    user_message = data.get("message", "")
    return jsonify({"response": chatbot_response(user_message)})

if __name__ == "__main__":
    app.run(debug=True)
    
