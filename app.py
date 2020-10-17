from flask import Flask, render_template, jsonify

# import pymongo library, which connects the Flask app to the Mongo database
import pymongo

# create an instance of Flask app
app = Flask(__name__)

# create a connection variable
client = pymongo.MongoClient("mongodb://air_quality:lCufxfsOMcMV4r74@cluster0-shard-00-00.6r4ig.mongodb.net:27017,cluster0-shard-00-01.6r4ig.mongodb.net:27017,cluster0-shard-00-02.6r4ig.mongodb.net:27017/test?ssl=true&replicaSet=atlas-56w20y-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.test

# set route
@app.route('/')
def index():
    # store the entire collection in a list
    #aqis = list(db.aqi.find())
    #print(aqis)

    #return the template with the aqi data passed in
    return render_template('index.html')

@app.route('/data')
def data():
    aqi = list(db.air_quality.find({},{'_id':False}))

    print(aqi)

    return jsonify({'features':aqi})

if __name__ == "__main__":
    app.run(debug=True)
