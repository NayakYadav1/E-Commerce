const { errorMsg } = require("@/lib");
const { Product, Category } = require('@/models');
const { unlinkSync } = require('node:fs');

class ProductsCtrl {
    index = async (req, res, next) => {
        try{
            let products = await Product.aggregate()
                .lookup({
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category'
                })
                .lookup({
                    from: 'brands',
                    localField: 'brandId',
                    foreignField: '_id',
                    as: 'brand'
                })

            res.send(products);
        } catch(error){
            errorMsg(next, error);
        }
    }

    store = async(req, res, next) => {
        try{
            const { name, status, description, summary, price, discountedPrice , categoryId, brandId, featured } = req.body;

            let images = [];
            
            for(let file of req.files){
                images.push(file.filename);
            }

            await Product.create({ name, status, description, summary, price, discountedPrice: discountedPrice || 0 , categoryId, brandId, featured, images });

            res.send({
                message: 'Product Added'
            });

        } catch (error){
            errorMsg(next, error);
        }
    }

    show = async(req, res, next) => {
        try{
            const { id } = req.params;

            const product = await Product.findById(id)
            if(product) {
                res.send(product);
            } else {
                next ({
                    message: 'Product Not Found',
                    status: 404,
                })
            }
        } catch (error){
            errorMsg(next, error);
        }
    }

    update = async(req, res, next) => {
        try{
            const { name, status, description, summary, price, discountedPrice, categoryId, brandId, featured } = req.body;
            const { id } = req.params;

            const product = await Product.findById(id);

            if(product){

                let images = product.images;

                if(req.files.length > 0) {
                    for(let file of req.files) {
                        images.push(file.filename);
                    }
                }
                await Product.findByIdAndUpdate(id, { name, status, description, summary, price, discountedPrice: discountedPrice || 0, categoryId, brandId, featured });

                res.send({
                    message: 'Product Updated'
                });
            } else {
                next ({
                    message: 'Product Not Found',
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
            const product = await Product.findById(id);
            if(product){
                for(let image of product.images) {
                    unlinkSync(`uploads/${image}`);
                }

                await Product.findByIdAndDelete(id);
                res.send({
                    message: 'Product Deleted'
                })
            } else {
                next ({
                    message: 'Product Not Found',
                    status: 404
                })
            }
        } catch(error){
            errorMsg(next, error);
        }
    }

    image = async(req, res, next) => {
        try{
            const { id, filename } = req.params;
            const product = await Product.findById(id);
            if(product){
                unlinkSync(`uploads/${filename}`);

                const images = product.images.filter(file => filename != file)

                await Product.findByIdAndUpdate(id, { images });

                res.send({
                    message: 'Product Image Deleted'
                });
            } else {
                next ({
                    message: 'Product Not Found',
                    status: 404
                })
            }
        } catch(error){
            errorMsg(next, error);
        }
    }
}

module.exports = new ProductsCtrl;