# Hotel Review App
This is a sample hotel review app boilerplate. This repository is setup for anyone to show us your skills in AngularJS, Javascript and mobile development.

### Basic Requirements
1. Get current location and display all hotels nearby.
2. Show the reviews of each hotel (Please find a open source API to get the reviews) and also show a photo gallery of each hotel
3. Make sure this app is able to run on iOS or Android simulator

You may add additional functionalities and styles to the app, is up to you to think and innovate.
Fork a copy of this to your own repository and do a pull request into this repository when you are done(Please leave any instructions in the pull request comment).


##### This project is a clone from Ionic Gulp Seed project:
https://github.com/tmaximini/ionic-gulp-seed


-------------------------------------------------
# Hotel Review App (Solution)

## Features
1. The app can capture the user's current location and show a list of near by hotels.

2. User can checkout ratings and reviews and few photos provided for the place.

3. The app also shoes the location of the hotel on the map. 
   And the distance and estimated travel time from the user location to the hotel.

4. The user can drag and place the red marker pin on the map to see hotel list near to that location.

> Other possible enhancements such as location search and search-radius controls   
> can also be added to provide a more complete hotel finder app experience. 


## Cordova build instructions.
1. `gulp -build`  
   Package the source files for the cordova project.

2. `cordova platform add android ios`  
   Add android and iOS platforms is required.

3. `cordova build`  
   Builds the xcode project and android debug apk files.  
   
4. The iOS app can also be run using `cordova run ios` but requires `ios-sim` 
   npm package to be installed globally.  
   The android project can be run by running `cordova run android`.
   

## Additional libraries used:
1. `angular-img-fallback` Was used to provide image placeholders during image is loaded in the `<img>` tags. 