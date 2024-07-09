const { errorMsg } = require("@/lib");
const { User } = require('@/models');
const bcrypt = require('bcryptjs');

class StaffsCtrl {
    index = async (req, res, next) => {
        try{
            const staffs = await User.find({ role: 'Staff' });

            res.send(staffs);
        } catch(error){
            errorMsg(next, error)
        }
    }

    store = async(req, res, next) => {
        try{
            let { name, email, password, confirmPassword, phone, address, status } = req.body;
            if(password == confirmPassword){
                // const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, 10)

                await User.create({ name, email, password: hash, phone, address, status, role: 'Staff' });

                res.send({
                    message: 'Staff added'
                })
            } else {
                    validationError(next, {Password: 'The password is not confirmed'})
            }
        } catch (error){
            errorMsg(next, error)
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params;

            const staff = await User.findById(id)
            if(staff) {
                res.send(staff);
            } else {
                next ({
                    message: 'Staff Not Found',
                    status: 404,
                })
            }
        } catch (error){
            errorMsg(next, error);
        }
    }

    update = async(req, res, next) => {
        try{
            const { name, phone, address, status } = req.body;
            const { id } = req.params;

            const staff = await User.findById(id)

            if(staff){
                await User.findByIdAndUpdate(id, { name, phone, address, status });
                res.send({
                    message: 'Staff Updated'
                })
            } else {
                next ({
                    message: 'Staff Not Found',
                    status: 404,
                });
            }
        } catch(error){
            errorMsg(next, error);
        }
    }

    destroy = async(req, res, next) => {
        try{
            const { id } = req.params;
            const staff = await User.findById(id);
            if(staff){
                await User.findByIdAndDelete(id);
                res.send({
                    message: 'Staff Deleted'
                })
            } else {
                next ({
                    message: 'Staff Not Found',
                    status: 404
                })
            }
        } catch(error){
            errorMsg(next, error);
        }
    }
}

module.exports = new StaffsCtrl;