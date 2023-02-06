import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    business_name: { type: String, required: [false, 'business_name is required'], unique: true },
    email: { type: String, required: [true, 'email is required'], unique: true },
    role: { type: String, required: false, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: [false, 'password is required'] },
})


userSchema.methods.passwordMatched = async function (passwordToBeVerified) {
    return await bcrypt.compare(passwordToBeVerified, this.password)
}

userSchema.pre('save', async function (next) {
    console.log(this)
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(this.password, salt)
    this.password = hashed
})

//email verification code
userSchema.methods.generateVerificationToken = function () {
    const user = this; const verificationToken = JWT.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    ); return verificationToken;
}

const User = mongoose.model('User', userSchema)

export default User;