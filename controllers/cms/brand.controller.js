const { errorMsg } = require("@/lib");
const { Brand } = require('@/models');

class BrandCtrl {
    index = async(req, res, next) => {
        try{
            const brand = await Brand.find();
            res.send(brand);
        } catch(error) {
            errorMsg(next, error);
        }
    }

    store = async(req, res, next) => {
        try{
            let { name, status } = req.body;
            await Brand.create({ name, status });
            res.send({
                message: 'Brand Added'
            });
        } catch (error) {
            errorMsg(next, error);
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params;
            const brand = await Brand.findById(id);
            if(brand){
                res.send(brand);
            } else {
                next({
                    message: 'Brand Not Found',
                    status: 404,
                });
            }
        } catch(error) {
            errorMsg(next, error);
        }
    }

    update = async(req, res, next) => {
        try{
            const { name, status } = req.body;
            const { id } = req.params;
            const brand = await Brand.findById(id);
            if(brand) {
                await Brand.findByIdAndUpdate(id, { name, status });
                res.send({
                    message: 'Brand Updated'
                });
            } else {
                next({
                    message: 'Brand Not Found',
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
            const brand = await Brand.findById(id);
            if(brand){
                await Brand.findByIdAndDelete(id);
                res.send({
                    message: 'Brand Deleted'
                });
            } else {
                next({
                    message: 'Brand Not Found',
                    status: 404
                });
            }
        } catch(error){
            errorMsg(next, error);
        }
    }
}

module.exports = new BrandCtrl;