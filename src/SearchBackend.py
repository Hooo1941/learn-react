import json
from flask import Flask, request
import time
app = Flask(__name__)

@app.route('/search', methods=['POST'])
def index():
    data = request.get_data()
    jsondata = json.loads(data)
    a = str(json.dumps(jsondata["data"]))
    print(a)
    if a == '"111"':
        print('sleep')
        time.sleep(5)
    return a

if __name__ == '__main__':
    app.run(debug=True)
