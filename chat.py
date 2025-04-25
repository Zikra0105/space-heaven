# 






import openai

openai.api_key = "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"
def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message["content"]

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            print("Goodbye!")
            break

        try:
            response = chat_with_gpt(user_input)
            print("Chatbot:", response)
        except Exception as e:
            print("Error:", e)

