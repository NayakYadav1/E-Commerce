const { errorMsg } = require("@/lib");
const { Category } = require('@/models');

class CategoryCtrl {
    index = async(req, res, next) => {
        try{
            const category = await Category.find();
            res.send(category);
        } catch(error) {
            errorMsg(next, error);
        }
    }

    store = async(req, res, next) => {
        try{
            let { name, status } = req.body;
            await Category.create({ name, status });
            res.send({
                message: 'Category Added'
            });
        } catch (error) {
            errorMsg(next, error);
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params;
            const category = await Category.findById(id);
            if(category){
                res.send(category);
            } else {
                next({
                    message: 'Category Not Found',
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
            const category = await Category.findById(id);
            if(category) {
                await Category.findByIdAndUpdate(id, { name, status });
                res.send({
                    message: 'Category Updated'
                });
            } else {
                next({
                    message: 'Category Not Found',
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
            const category = await Category.findById(id);
            if(category){
                await Category.findByIdAndDelete(id);
                res.send({
                    message: 'Category Deleted'
                });
            } else {
                next({
                    message: 'Category Not Found',
                    status: 404
                });
            }
        } catch(error){
            errorMsg(next, error);
        }
    }
}

module.exports = new CategoryCtrl;