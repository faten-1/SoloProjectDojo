const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username : {
        type: String ,
        required : [true, " username is required"]
    },
    email : {
        type: String ,
        required : [true, " emaik is required"]
    },
    password : {
        type: String ,
        required : [true, " password is required"]
    }

})

// create virtual confirm password field 
UserSchema.virtual('confirmPassword')
.get(()=> this._confirmPassword)
.set(value=> this._confirmPassword = value)

//check passwords matches (mongoose middleware , must be ES5)
UserSchema.pre('validate',function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password ')
    }
    next()
})

// middleware of hashing password 
UserSchema.pre('save', function (next) {
    console.log('in pre save middleware', this.password)
    bcrypt.hash(this.password,10)
    .then (hashedPassword=> {
        this.password = hashedPassword
        next()
    })
    
})


module.exports = mongoose.model("User",UserSchema)