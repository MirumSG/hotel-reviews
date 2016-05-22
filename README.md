# Hotel Review App
Sample hotel review app by Kyaw Zaw Win

### Basic Requirements
1. Get current location and display all hotels nearby.
2. Show the reviews of each hotel (Please find a open source API to get the reviews) and also show a photo gallery of each hotel
3. Make sure this app is able to run on iOS or Android simulator

You may add additional functionalities and styles to the app, is up to you to think and innovate.
Fork a copy of this to your own repository and do a pull request into this repository when you are done(Please leave any instructions in the pull request comment).


##### This project is a clone from Ionic Gulp Seed project:
https://github.com/tmaximini/ionic-gulp-seed

##### Instruction

1. npm install
2. bower install
3. cordova platform add android/ios
4. cordova emulate android

##### Notes

- Google map has 1000 requests/day api limit

##### Features

- Neaby Hotel Listing based on GeoLocation
- Bookmarking hotel
- Native Social Sharing
- Hotel Review

##### Technical

- Cordova 5
- 1 Hour cache
- Modefied seed code for better injection to avoid injection issue with minification
- Configurable Google place API wrapper