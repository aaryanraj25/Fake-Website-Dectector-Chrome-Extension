from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/detect-spam', methods=['POST'])
def detect_spam():
    data = request.json
    ad_content = data.get('ad_content')
    
    # Call your spam detection logic here
    # For example: result = is_spam(ad_content)
    result = is_spam(ad_content)  # Replace with your actual function call

    return jsonify({'result': result})

def is_spam(ad_content):
    # Your spam detection logic goes here
    # Return 'spam' or 'not spam' based on your analysis
    # Placeholder logic:
    if "spammy" in ad_content:
        return 'spam'
    else:
        return 'not spam'

if __name__ == '__main__':
    app.run(debug=True)
