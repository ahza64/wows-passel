Note: This app is mostly intended to showcase some of my skills as a software engineer. Please see the bottom for more information on my development process and continue reading for general readme app information.

This is a Data Visualization application for the World of Warships online video game based on wold war 2 ships. The data shown is a representation of ship statistics, indicating ship characteristics and performance. It's purpose is to help orchestrate one's in game fleet. The developers regularly add new ships and modify the stats, so it can be hard to keep track of which similar classed ships possess what traits compared to other comparable ships.

The app is currently up on a standby server (takes 30sec to warm up so give it time) at wows-compare.herokuapp.com.

To install:
-you'll need to set up a free app on wargaming's developer site, retrieve a application_ID https://developers.wargaming.net/
-set up a .env file
-add: WOWS_APP_ID=your new app_ID that you jsut signed up for
$: npm init
$: npm run build

To run locally in dev mode:
$: npm run devstart
$: npm run dev
$: mongod

Wargaming has provided an API that provides a currently updated digital encyclopedia for the ships. My app takes that data, rebuilds it into a mongo database, and curates the data into more usable samples. The React frontend displays request buttons and makes requests to a node.js server that takes the requested data from the mongo database and transposes it in a requested order and sends it to the React.js frontend. React then takes the data, sends it to Charts.js and displays the resulting graph sent back. I'm choosing to do simpler graphs right now, and plan to expand with my experience in D3.js graphing tech in the future.
