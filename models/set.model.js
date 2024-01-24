import mongoose from "mongoose";
const {Schema} = mongoose

const SetSchema = new Schema({
  
    set: {
        type: String,
        required: true,

    }

},
    { timestamps: true }
);

export default mongoose.model("Set", SetSchema);
