const bcrypt = require('bcryptjs');
const { User } = require('@/models');
const { validationError, errorMsg } = require('@/lib');

// We can also use func as well not class necessary
class RegisterCtrl {
    register = async (req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address } = req.body;
            if(password == confirmPassword){
                // const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, 10)

                await User.create({ name, email, password: hash, phone, address })

                res.send({
                    message: 'Thank you for registering'
                })
            } else {
                    validationError(next, {Password: 'The password is not confirmed'})
            }
        } catch(error){
            errorMsg(next, error);
        }
    };
};

module.exports = new RegisterCtrl;