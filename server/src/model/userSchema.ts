import {Schema, model} from 'mongoose';

const UserSchema = new  Schema({
    name: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.methods.toJson = function(){
    let users = this;
    let userObject = users.toObject();
    delete userObject.password;
    return userObject
}


export default model('User', UserSchema)