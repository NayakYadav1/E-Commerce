const { errorMsg, validationError } = require("@/lib");
const { User } = require("@/models");
const bcrypt = require('bcryptjs')

class CustomersCtrl {
    index = async(req, res, next) => {
        try{
            const customers = await User.find({ role: 'Customer' });
            res.send(customers);
        } catch(error) {
            errorMsg(next, error);
        }
    }

    store = async(req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address, status } = req.body;
            if(password == confirmPassword) {
                const hash = bcrypt.hashSync(password, 10);
                await User.create({ name, email, password: hash, phone, address, status, role: 'Customer' });
                res.send({
                    message: 'Customer Added'
                })
            } else {
                validationError(next, { Password: 'The password is not confirmed'});
            }
        } catch (error) {
            errorMsg(next, error);
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params;
            const customer = await User.findById(id);
            if(customer){
                res.send(customer);
            } else {
                next({
                    message: 'Customer Not Found',
                    status: 404,
                });
            }
        } catch(error) {
            errorMsg(next, error);
        }
    }

    update = async(req, res, next) => {
        try{
            const { name, phone, address, status } = req.body;
            const { id } = req.params;
            const customer = await User.findById(id);
            if(customer) {
                await User.findByIdAndUpdate(id, { name, phone, address, status });
                res.send({
                    message: 'Customer Updated'
                });
            } else {
                next({
                    message: 'Customer Not Found',
                    status: 404
                });
            }
        } catch(error) {
            errorMsg(next, error);
        }
    }

    destroy = async(req, res, next) => {
        try{
            const { id } = req.params;
            const customer = await User.findById(id);
            if(customer){
                await User.findByIdAndDelete(id);
                res.send({
                    message: 'Customer Deleted'
                });
            } else {
                next({
                    message: 'Customer Not Found',
                    status: 404
                });
            }
        } catch(error){
            errorMsg(next, error);
        }
    }
}

module.exports = new CustomersCtrl;