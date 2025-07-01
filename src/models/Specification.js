import Mongoose from "mongoose";

const Schema = new Mongoose.Schema(
  {
	"productId": {"type": Mongoose.Schema.Types.ObjectId,"ref": "Product"},
	"name": {"type": "String","required": false},
	"value": {"type": "String","required": false},
	"status": {"type": "Boolean","default": true},
	"createdAt": {"type":"Number"},
	"updateAt": {"type":"Number"}
},
  {
    timestamps: {currentTime: () => Math.floor(Date.now() / 1000)},
    //TABLE_NAME
  });

Schema.set('toObject', {virtuals: true});
Schema.set('toJSON', {virtuals:true});

export default Mongoose.model("Specification", Schema);
