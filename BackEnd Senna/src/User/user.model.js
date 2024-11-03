'use strict'
import {Schema, model} from 'mongoose'
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true, 
        unique: true
    },
    dpi: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    workingName: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    ROL: {
        type: String,
        enum: ['ADMIN', 'CLIENT'],
        default: 'CLIENT'
    },
    accountNumber: {
        type: Schema.ObjectId,
        ref: 'Account',
        unique: true
    }
}, {
    versionKey: false
})

export default model('User', userSchema)