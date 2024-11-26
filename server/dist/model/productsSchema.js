import { model, Schema } from 'mongoose';
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: [String]
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
export default model('Product', ProductSchema);
