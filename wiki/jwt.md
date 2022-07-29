# How To Use JSON Web Tokens (JWTs) in Express.js

# Introduction
JSON Web Tokens (JWTs) supports authorization and information exchange.

One common use case is for allowing clients to preserve their session information after logging in. By storing the session information locally and passing it to the server for authentication when making requests, the server can trust that the client is a registered user.

# Advantages authentication with JWT
Authentication with JWT has several advantages over the traditional authentication process, primarily the scalability of stateless applications. And since it’s becoming popular among such heavyweights as Facebook and Google, it’s adoption across the industry likely will continue to grow. 

Other advantages include:

* Simple verification through a JSON Web Token 
* You can use an authentication service or outsource it
* Provides more trustworthiness than cookies or sessions

# The Need for JSON Web Token
There are several reasons why applications use JSON Web Tokens for authentication:
* JWT is an excellent choice to be passed in HTML and HTTP environments due to its smaller footprint when compared to other types of tokens
* JSON Web Tokens can be signed using a shared secret and also by using public/private key pairs
* It is easier to work with JWT as JSON parsers are standard in most programming languages
* JWT is also suitable for implementing authorization in large-scale web applications

## Structure of a JWT
A JSON Web Token consists of:

* Header – Consists of two parts: the type of token (i.e., JWT) and the signing algorithm (i.e., HS512)

* Payload – Contains the claims that provide information about a user who has been authenticated along with other information such as token expiration time

* Signature – Final part of a token that wraps in the encoded header and payload, along with the algorithm and a secret

# JWT Use Cases
Some scenarios where JSON Web Tokens are useful:
* Authorization - This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.

* Information Exchange - JSON Web Tokens are a good way of securely transmitting information between parties.


# Step 1: Generating a JWT
To generate a JWT, you need to use the jsonwebtoken library.

You can add (install) the jsonwebtoken library by running the following command in your terminal:

    npm install jsonwebtoken

And import it to your files like so:

    const jwt = require('jsonwebtoken');

or you can use the following import statement:

    import jwt from 'jsonwebtoken';

To generate a JWT, you need to pass in a payload. The payload is a JSON object that contains the information you want to store in the JWT.

You need three pieces of information to generate a JWT:
1. The secret key that you want to use to sign the JWT.
2. The payload that you want to store in the JWT.
3. The expiration time of the JWT.

The token secret is a long random string used to encrypt and decrypt the data

The piece of data that you hash in your token can be something either a user ID or username or a much more complex object. In either case, it should be an identifier for a specific user.

The token expire time is a string, such as 1800 seconds (30 minutes), that details how long until the token will be invalid.

Here's an example of how to generate a JWT:

    const secret = 'my-secret';
    const payload = {
        sub: '1234567890',
        name: 'John Doe',
        admin: true
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    console.log(token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjz1I8dUz27aevlE

This can be sent back from a request to sign in or log in a user:

    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        if (username === 'admin' && password === 'password') {
            const payload = {
                sub: '1234567890',
                name: 'John Doe',
                admin: true
            };
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

# Step 2: Verifying (Authenticating) a JWT
There are many ways to go about implementing a JWT authentication system in an Express.js application.

One approach is to utilize the middleware functionality in Express.js.

How it works is when a request is made to a specific route, you can have the (req, res) variables sent to an intermediary function before the one specified in the `app.get((req, res) => {})`.

The middleware is a function that takes parameters of (req, res, next).

> ## What is middleware?
> Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

> 

The req is the sent request (GET, POST, DELETE, PUT, etc.).
The res is the response that can be sent back to the user in a multitude of ways (res.sendStatus(200), res.json(), etc.).
The next is a function that can be called to move the execution past the piece of middleware and into the actual app.get server response.

Here is an example middleware function for authentication:

    const authenticate = (req, res, next) => {
        const token = req.headers['authorization'].split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token.' });
            }
            req.user = decoded;
            next();
        });
    };

And an example of a request that would use that piece of middleware would resemble something like this:

    app.get('/api', authenticate, (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

This code will authenticate the token provided by the client. If it is valid, it can proceed to the request. If it is not valid, it can be handled as an error.

# How to send JWT from Postman
You can send a JWT from Postman by adding the following header to the request:

    Authorization: Bearer <token>

The token is the JWT that you generated in the previous step (while logging in).

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjz1I8dUz27aevlE

Or you can go to Authorization tab, click on dropdown next to `Type`, and select Bearer.  Then paste the token in the text box.