import Joi from 'joi'

const validation = {
    add: {
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            age: Joi.number()
        })
    },
    update: {
        body: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            age: Joi.number()
        })
    },
}

export default validation;