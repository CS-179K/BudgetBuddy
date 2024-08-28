# Steps to Run the backend


### `npm install`

This command installs all the dependencies required for the project as specified in the package.json file located in the project’s root directory.
It creates a node_modules folder in the project directory and installs all the dependencies into that folder.
You typically run this command after cloning the project for the first time or after adding new dependencies.

### `node server.js`
When you run npm start, it executes the command defined after the start script. In this example, it runs node app.js to start the application.
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Before start please create the .env file under the root of backend 
include: MONGO_URI (You could config your own cluster on https://www.mongodb.com/ for free), PORT and SECRET to run the MongoDB
The PORT could be 4000 to support frontend.

