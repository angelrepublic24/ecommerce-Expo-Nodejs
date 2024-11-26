import {model, Schema} from 'mongoose'

const OrderSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    products: {
        type: [Schema.ObjectId],
        ref: 'Product'
    },
    status: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default model('Order', OrderSchema)