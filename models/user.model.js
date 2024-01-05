import mongoose from "mongoose";
const {Schema} = mongoose

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
    },
    set: {
        type: String,
        required: true,

    },
    house: {
        type: String,
        required: true,

    },
    phone_number: {
        type: String,
        default: "", 
    },
    state: {
        type: String,
        default: "", 
    },
    country: {
        type: String,
        default: "", 
    },
    address: {
        type: String,
        default: "", 
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "", 
    },
    sex: {
        type: String,
        default: "", 
    },
    bio: {
        type: String,
        default: "", 
    },
    profession: {
        type: String,
        default: "", 
    },
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date }, 
    status: {
        type: String,
        default: "", 

    },
    // subjects: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Subjects',
    //   }],

},
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);