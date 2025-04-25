from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

chatbot = ChatBot('InteriorDesignBot')

# Training the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.english')

while True:
    try:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Bot: Goodbye!")
            break
        response = chatbot.get_response(user_input)
        print(f"Bot: {response}")
    except (KeyboardInterrupt, EOFError, SystemExit):
        break
