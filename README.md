# Capstone project

Capstone project of Udacity's Front-End Web Development Nanodegree program

The project flow is as follow:
- Ask The user to enter their origin city (not required) and a city to visit, a departing and returing date (required).
- if the city enterend is not found, an alert will pop-up to ask the user to enter again.
- if the city entered is found, a card will appear below the form containing the data entered by the user, the weather related data, an image of the city, days left untill leaving and length of the trip.
- if the city is found but there is not image for the city, the card containing the information will appear with out the image.
- all data related to the trip will be sent to server to be saved in an array of objects (each object represents a trip)

- The extra feature is (adding end date and display length of trip)

API used:
- Geonames api (to get lat,lng and country name)
- Weatherbit api (to get tempreture and description)
- Pixabay api (to get an image of the city to be visited)


Dependencies:
body-parser, cors, dotenv, express, node-fetch, webpack, webpack-cli

devDependencies: 
@babel/core, @babel/preset-env, babel-loader, clean-webpack-plugin,
css-loader, html-webpack-plugin, mini-css-extract-plugin,
node-sass, optimize-css-assets-webpack-plugin, sass-loader,
style-loader, terser-webpack-plugin, webpack-dev-server, jest, supertest, workbox-webpack-plugin



Developed by Seham Alzahrani