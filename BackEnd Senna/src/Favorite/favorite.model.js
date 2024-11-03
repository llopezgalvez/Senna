import { Schema, SchemaType, model } from "mongoose"

const favoriteSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    accountNumber:{
        type: String,
        required: true,
        unique: true
    },
    typeAccount:{
        type: String,
        enum: ['Ahorro','Monetaria'],
        required: true
    }
},{
    versionKey: false
})

export default model('favorite', favoriteSchema)