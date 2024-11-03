//mchuquiej-2021101
import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    }
},{
    versionKey: false
})

export default model('product', productSchema)

