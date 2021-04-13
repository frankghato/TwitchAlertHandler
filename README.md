# Twitch Alert Handler
This project uses the Streamlabs API and JavaScript to update an HTML document in response to Twitch alerts.

# Motivation
I created this project because I wanted to make my stream more interactive. I created overlay elements based on Pokemon that interact with alerts.

# Features
This specific branch of the project is more simplified. Rather than reacting to all alerts and evolving, it specifically reacts to follow alerts only and does not evolve.

# How to use
If you'd like to use this code yourself:
- Add the images you'd like to use to the gifs folder.
- Add your API token in main.js. (ex. if your API token was "x", line 1 should read: const socketToken = 'x';)
- Edit the variables with the paths to your images and length of your animations in main.js. (ex. if your default gif is named "x", change the "defaultGif" variable to "gifs/x.gif", and if your default gif is 2 seconds long, change the "defaultGifLength" variable to 2000.)

# Notes
- Unlike the master branch, this branch specifically DOES feature functionality to display the usernames of followers.
  This was added to allow the user to display usernames of those that follow in one place, while still using StreamLabs to display the users of all other alerts in a separate       place.
  This was added because there is no way (that I am aware of) to do this within StreamLabs's alertbox itself.
