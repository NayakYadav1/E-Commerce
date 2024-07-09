const { Schema } = require('mongoose');
const jwt = require("jsonwebtoken");
const { User } = require('@/models');

const validationError = (next, errors) => {
    next({
        message: 'There seems to be some validation issue',
        status: 422,
        errors,
    })
}

const errorMsg = (next, error) => {
    console.log(error);

    if ('errors' in error) {
        let list = {}

        for (let k in error.errors) {
            list = {
                ...list,
                [k]: error.errors[k].message,
            }
        }
        validationError(next, list);
    } else if ('code' in error && error.code == 11000) {
        validationError(next, { email: 'Given email is already in use' });
    } else {
        next({
            message: 'Something went wrong',
            status: 400
        })
    }
}

const auth = async (req, res, next) => {
    try{
        if('authorization' in req.headers) {
            const token = req.headers.authorization.split(' ').pop();
            
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            
            const user = await User.findById(decoded.uid);
            if(user){
                req.user = user
                next()
            } else{
                next({
                    message: 'Authentication token is invalid',
                    status: 401,
                })
            }
        } else {
            next({
                message: 'Authentication token missing',
                status: 401,
            })
        }
    }catch(error) {
        next({
            message: 'Authentication Token Invalid',
            status: 401,
        });
    }
}

const cmsAccess = (req, res, next) => {
    if(req.user.role != "Customer"){
        next();
    } else {
        next({
            message: 'Access Denied',
            status: 403
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == "Admin"){
        next();
    } else {
        next({
            message: 'Access Denied',
            status: 403
        })
    }
}

module.exports = { validationError, errorMsg, auth, cmsAccess, adminOnly }