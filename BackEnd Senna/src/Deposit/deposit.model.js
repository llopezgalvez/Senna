import {Schema, model} from 'mongoose'

const depositSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    receiver: {
        type: Schema.ObjectId,
        ref: 'Account',
        required: true
    }
},{
    versionKey: false
})

export default model('Deposit', depositSchema)