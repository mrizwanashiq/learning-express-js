# DATA VALIDATION IN NODEJS AND EXPRESS USING JOI
When we write backend code that interacts with end-users and takes and processes data from requests, we have to be super careful to put up some form of protection that filters out invalid data. For example, if we store the date of birth of a user in our database, then we cannot allow a value that is not a date to be stored, because it is not what we intend to be present and can lead to strange behavior.

To mitigate this, we can set up filters that analyze each and every data key sent by the frontend. We can do this all by ourselves without using a third-party library.
Assume in our code we want to check whether there is a key called parameterX which lies between 100 and 1000.

    if (!data.parameterX) {
        throw new Error('parameterX is required');
    }

    try {
        const value = parseInt(data.parameterX);
        if (value < 100 || value > 1000) {
            throw new Error('parameterX must be between 100 and 1000');
        }
    } catch (e) {
        throw new Error('parameterX must be an integer');
    }

This is a very simple example, but it is not the only way to do it. We can use the Joi library to do this.

    const schema = Joi.object().keys({
        parameterX: Joi.number().min(100).max(1000).required()
    });

    const { error } = Joi.validate(data, schema);
    if (error) {
        throw new Error(error.details[0].message);
    }

# Step 1: Install Joi
First, we need to install Joi.

    npm install joi

# Step 2: Create a schema
We can create a schema using the Joi library.

    const schema = Joi.object().keys({
        parameterX: Joi.number().min(100).max(1000).required()
    });

# Step 3: Validate data

    const { error } = Joi.validate(data, schema);
    
    if (error) {
        throw new Error(error.details[0].message);
    }