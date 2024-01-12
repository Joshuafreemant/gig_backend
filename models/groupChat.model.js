import mongoose from "mongoose";
const {Schema} = mongoose

const GroupMessageSchema = new Schema({
   
      sender: {
        type: String,
      },
      set: {
        type: String,
      },
      text: {
        type: String,
      },
},
    { timestamps: true }
);

export default mongoose.model("GroupMessage", GroupMessageSchema);
