import Mongoose from "mongoose";

const Schema = new Mongoose.Schema(
  //FIELDS_IS_HERE
  {
    timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
    //TABLE_NAME
  });

Schema.set('toObject', {virtuals: true});
Schema.set('toJSON', {virtuals:true});

export default Mongoose.model("//MODEL_NAME", Schema);
