import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  crearedAt: {
    type: Number
  },
  updateAt: {
    type: Number
  }
},
{
  timestamps: {currentTime: () => Math.floor(Date.now() / 1000)}
});

Schema.set('toObject', {virtuals: true});
Schema.set('toJSON', {virtuals: true});

export default mongoose.model("category", Schema);
