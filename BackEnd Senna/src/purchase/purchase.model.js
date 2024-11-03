import { model, Schema } from 'mongoose'

const purchaseSchema = new Schema({
    userAccount: {
        type: String,
        required: true
    },
    product: {
        type: Schema.ObjectId,
        ref: 'product',
        required: true
    }, 
    date: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

export default model('purchase', purchaseSchema)