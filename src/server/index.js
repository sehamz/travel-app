const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8086, function() {
    console.log('Example app listening on port 8086!')
})

// array stores objects, each obj represents a trip
const trips = [];
app.post("/trip", function(request, response) {
    const newTrip = {
            from: request.body.from,
            to: request.body.to,
            depDate: request.body.depDate,
            retDate: request.body.retDate,
            temp: request.body.temp,
            desc: request.body.desc
        }
        // response.send(newTrip)
        // console.log(newTrip)
    trips.push(newTrip)
    console.log(trips)
    response.send(trips)
})

app.get("/getTrips", function(request, response) {
    // console.log(trips)
    response.send(trips);
})

module.exports = app;