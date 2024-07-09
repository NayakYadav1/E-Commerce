const { Schema, model } = require('mongoose');
const { stringRequired, booleanTrue, extraConfig } = require('@/lib/constants');

const User = model('User', new Schema({
    name: stringRequired,
    email: { ...stringRequired, unique: true },
    password: {...stringRequired, select: false},
    phone: { ...stringRequired, maxLength: [30, 'The phone must be less then 30 characters'] },
    address: stringRequired,
    role: { type: String, enum: ['Admin', 'Staff', 'Customer'], default: 'Customer' },
    status: booleanTrue
}, extraConfig));

module.exports = User;