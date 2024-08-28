const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const MAX_LOGIN_ATTEMPTS = 5; // Maximum allowed attempts before lockout
const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours lock time

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static Signup Method
userSchema.statics.signup = async function(email, password) {

    // Validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is too weak')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

// Static Login Method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    // Validate email format
    if (!validator.isEmail(email)) {
        throw Error('Invalid email format');
    }

    if (!user) {
        throw Error('Incorrect Email Address')
    }
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw Error('Account is temporarily locked due to multiple failed login attempts. Please try again later.');
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match) {

        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            user.lockUntil = Date.now() + LOCK_TIME;
        }
        await user.save();

        throw Error('Incorrect Password')
    }
    // Reset login attempts on successful login
    if (user.loginAttempts && user.loginAttempts > 0) {
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)