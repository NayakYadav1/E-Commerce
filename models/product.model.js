const { Schema, model } = require('mongoose');
const { stringRequired, extraConfig, booleanTrue, foreignConfig, numberRequired } = require('@/lib/constants');

const Product = model('Product', new Schema({
    name: stringRequired,
    description: stringRequired,
    summary: stringRequired,
    price: numberRequired,
    discountedPrice: { type: Number, default: 0},
    images: [ stringRequired ],
    categoryId: { ...foreignConfig, ref: 'Category' }, //Mongo le aafai custom id banako hunxa tesaile yesai tanna mildaina so yesari taninxa 
    brandId: { ...foreignConfig, ref: 'Brand' },
    status: booleanTrue,
}, extraConfig))

module.exports = Product