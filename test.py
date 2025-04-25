import nltk
from nltk.chat.util import Chat, reflections

pairs=[
[
r'hi|hey|hello',
['Hello','Hey there']
],
[
    r"my name is (.*)",
    ["Hello %1 ,How are you today?"]
 ],
 [
     r"What is your name ? ",
     ["I am chatbot.You can call me ChatBuddy"]
 ],
 [
    r"how are you?",
    ["I'm good.How about you?"]
 ],
 [
    r"quit",
     ["bye! Take care."]
 ],
 [
    r"(.*)",
    ["Sorry, I didn't  understand that."]

 ]
]

chatbot = Chat(pairs,reflections)

while True:
    user_input = input('You: ')
    response = chatbot.respond(user_input)
    print('ChatBot: ',response) 