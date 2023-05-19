import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    }, 
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, 'Email address already exist']
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User