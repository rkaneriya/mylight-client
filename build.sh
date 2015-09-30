#!/bin/bash

echo "Building 'dist' directory from 'app' project directory...";

mkdir -p dist/ dist/css dist/images/ dist/js; 
cp -f app/css/* dist/css/; 
cp -f app/images/* dist/images;
cp -f app/index.html dist/index.html; 
{ 
	browserify -t reactify app/js/main.js -o dist/js/main.js && 
	echo "Done. Run app with 'npm start'.";
} || echo "ERROR: You must globally install 'browserify' and 'reactify'."; 
