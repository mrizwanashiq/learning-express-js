import Joi from 'joi'

const validation = {
    register: {
        body: Joi.object().keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required()
        })
    },
    login: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    update: {
        body: Joi.object().keys({
            name: Joi.string(),
            password: Joi.string(),
            email: Joi.string().email()
        })
    },
}

export default validation;