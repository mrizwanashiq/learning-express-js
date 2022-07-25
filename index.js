import express from 'express';

const app = express();

/**
 * The first line here is grabbing the main Express module from the package you installed. 
 * This module is a function, which we then run on the second line to create our app variable. 
 * You can create multiple apps this way, each with its own requests and responses.
 */

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/**
 * These lines of code is where we tell our Express server how to handle a GET request to our server. 
 * Express includes similar functions for POST, PUT, PATCH, DELETE, etc. using app.post(...), app.put(...), etc.
 * 
 * These functions take two main parameters. The first is the URL for this function to act upon. 
 * In this case, we are targeting '/', which is the root of our website: in this case, localhost:3000.
 * 
 * The second parameter is a function with two arguments: req, and res. 
 * req represents the request that was sent to the server; We can use this object to read data about what the client is requesting to do. 
 * res represents the response that we will send back to the client.
 * Here, we are calling a function on res to send back a response: 'Successful response.'.
 */

app.listen(5000, function () {
    console.log('Started application on port 5000');
});

/**
 * Finally, once we’ve set up our requests, we must start our server! 
 * We are passing 3000 into the listen function, which tells the app which port to listen on. 
 * The function passed in as the second parameter is optional and runs when the server starts up. 
 * This provides us some feedback in the console to know that our application is running.
 */