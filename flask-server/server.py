from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"]}})

#openai semantic search api

@app.route('/api/chatbot', methods=['POST'])
def semantic_search():
    data = request.json
    quesiton = data.get('question')
    quesiton = data.get('text')

    # Perform any necessary processing or computations here

    response = {
        'message': 'This is a response from the server. You sent: ' + quesiton + '.'
    }

    return jsonify(response)

if __name__ == '__main__':

    app.run(debug=True)
