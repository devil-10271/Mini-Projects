from dotenv import load_dotenv
import streamlit as st
import os
import google.generativeai as genai 

# Load environment variables
load_dotenv()

# Configure the API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the model and start a chat
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

# Function to get response from the model
def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    return response

# Set Streamlit page configuration
st.set_page_config(page_title="ChatBot")

# Page header
st.header("Gemini Q&A")

# Initialize chat history in session state if it doesn't exist
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

# Input box for the user's question
input_text = st.text_input("Input:", key="input")
submit = st.button("Ask the question")
history = st.button("Show history")

you_color = "blue"
bot_color = "green"

# If the submit button is clicked and input is provided
if submit and input_text:
    response_chunks = get_gemini_response(input_text)
    
    # Append user's question to the chat history
    st.session_state['chat_history'].append(("You", input_text))
    
    st.subheader("The Response is")
    for chunk in response_chunks:
        st.write(chunk.text)
        # Append each chunk of response to the chat history
        st.session_state['chat_history'].append(("Bot", chunk.text))


if history:
    for role, text in st.session_state['chat_history']:
        if role == "You":
            st.markdown(f'<div style="color: {you_color}; text-align: right;">{role}:</div><div style="text-align: right;">{text}</div', unsafe_allow_html=True)
        elif role == "Bot":
            st.markdown(f'<div style="color: {bot_color}; text-align: left;">{role}:</div><div style="text-align: left;">{text}</div', unsafe_allow_html=True)
