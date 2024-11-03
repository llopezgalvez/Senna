import { Schema, model } from "mongoose";

const transferSchema = new Schema({
    userAccount:{
        type:String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    description:{
        type:String,
    },
    transferAccount:{
        type:String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
},
    {
        versionKey: false
    }
)

export default model('transfer', transferSchema)