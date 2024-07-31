const mongoose=require('mongoose');
const bcrypt = require('bcrypt');


//define person schema

const userSchema =new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    password:{
        required:true,
        type:String
    }

});

userSchema.pre('save', async function(next){
    const user = this;

    // Hash the password only if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Override the plain password with the hashed one
        user.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

userSchema.pre('findOneAndUpdate', async function(next){
    const update = this.getUpdate();

    // If password field is not being updated, skip hashing
    if (!update.password) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(update.password, salt);
        
        // Override the plain password with the hashed one
        this.getUpdate().password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log("here :",isMatch);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create Person model
const User=mongoose.model('User',userSchema);

module.exports=User;