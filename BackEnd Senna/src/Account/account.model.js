import {Schema, model} from 'mongoose'

const accountSchema = new Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true
    },
    transfer: [{
        type: Schema.ObjectId,
        ref: 'transfer',
    }],
    purchase: [{
        type: Schema.ObjectId,
        ref: 'purchase'
    }]
}, {
    versionKey:  false
})

export default model('Account', accountSchema)