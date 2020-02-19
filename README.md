## Production
front - https://youtubetagsdemoapp.herokuapp.com/
backend API (no view) - https://tagsapi.herokuapp.com/

Please allow some time for Heroku dyno to wake up when first landing on page
Please allow some time for Heroku dyno to wake up when making the first API call such as navigating to the search page or saving a video

# Front
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Back
Separate API to handle CRUD Operations 

## Development server
https://github.com/Jehsee/youtube-tags for front end code
Run `ng serve --watch` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

https://github.com/Jehsee/tagsApi for back end code
Run `npm start` to run local back end


## Requirements
1. Ability to load and play youtube videos using youtube urls
2. Ability to save youtube urls to a database
3. Ability to add tags to a youtube url
4. Ability to update and delete tags to a youtube url
5. Ability to search for a youtube url
6. Pagination of list of urls

## Angular Material
Component and design based off of Angular Material. https://material.angular.io/

## Home Page
* User can enter a youtube url to load the video.
* A incorrect url format will have a notification pop up.
* Ability to save and add tags to video will only show on successful video playback
* Video will autoplay
* Pressing enter or comma while inputting tags will separate the tags
* On submission of video, user is taken to the video edit page

## Edit Page
* User can update by adding or removing tags.
* On successful update, a notification will pop up.

