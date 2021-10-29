from flask import Flask
from flask_restful import Api, Resource
import time
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

class HelloWorld(Resource):
    def post(self, data):
        print(data)
        return {data}


api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
