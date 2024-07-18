const { errorMsg, validationError } = require("@/lib");
const { User, Review, Order, Detail } = require('@/models');
const bcrypt = require('bcryptjs');

class ProfileCtrl {
    detail = async(req, res, next) => {
        res.send(req.user);
    }

    update = async(req, res, next) => {
        try{
            const { name, phone, address } = req.body;
            await User.findByIdAndUpdate(req.user._id, { name, phone, address });
            res.send({
                message: 'Profile Updated'
            })
        } catch(error){
            errorMsg(next, error);
        }
    }

    password = async(req, res, next) => {
        try{
            const { oldPassword, newPassword, confirmPassword } = req.body;

            const user = await User.findById(req.user._id).select('+password');

            if(bcrypt.compareSync(oldPassword, user.password)) {
                if(newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, 10);

                    await User.findByIdAndUpdate(req.user._id, { password: hash });

                    res.send({
                        message: 'Password Updated'
                    })
                } else {
                    validationError(next, { password: 'The password is not confirmed' });
                }
            } else {
                validationError(next, { password: "Incorrect old password" });
            }
        } catch(error) {
            errorMsg(next, error);
        }
    }

    reviews = async (req, res, next) => {
        try {
            let reviews = await Review.aggregate()
                .match({ userId: req.user._id })
                .lookup({
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                })
                for(let i in reviews) {
                    reviews[i].product = reviews[i].product[0]
                }

                res.send(reviews);
        } catch (error) {
            errorMsg(next, error);
        }
    }

    orders = async (req, res, next) => {
        try{
            let order = await Order.aggregate()
                .match({ orderId: order[i]._id })
                .lookup({
                    form: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                })

                for(let j in details) {
                    details[j].product = details[j].product[0];
                }

                orders[i] = {
                    ...orders[i].toJSON(),
                    details
                }

                res.send(orders);
        } catch (error) {
            errorMsg(next, error);
        }
    }

}

module.exports = new ProfileCtrl;