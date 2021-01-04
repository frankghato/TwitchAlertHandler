# Twitch Alert Handler
This project uses the Streamlabs API and JavaScript to update an HTML document in response to Twitch alerts.

# Motivation
I created this project because I wanted to make my stream more interactive. I created overlay elements based on Pokemon that interact with alerts and evolve based on the total number of alerts per month.

# Features
This project features three different elements that all react to alerts differently. For my example, I used the Pokemon Chikorita, Totodile, and Cyndaquil. Chikorita and its evolutions react to every alert type by playing an attacking animation and will evolve based on the overall number of alerts. Totodile reacts specifically to subscription alerts and will evolve based on the total number of subscriptions that occur each month. Cyndaquil reacts specifically to donation alerts and will evolve based on the total amount donated each month. On the first day of each month, the three Pokemon will all be reset back to their first form.


# How to use
If you'd like to use this code yourself:
- Add the images you'd like to use to the gifs folder.
- Add your API token in main.js. (ex. if your API token was "x", line 1 should read: const socketToken = 'x';)
- Edit the variables with the paths to your images and length of your animations in main.js. (ex. if your default gif is named "x", change the "defaultGif" variable to "gifs/x.gif"
- Edit the counting variables to what your desired goals are in main.js. (ex. if your monthly sub goal is 50, change the variable "subGoal" to 50.)
- If you would prefer to have goals reset weekly rather than monthly, inside the onload event listener simply change "new Date().getDate()" to "new Date.getDay()" and change the condition to whichever day of the week you'd like it to reset. (Sunday = 0, Monday = 1, and so on.)

