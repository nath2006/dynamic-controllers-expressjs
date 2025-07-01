import Mongoose from 'mongoose'

const Schema = new Mongoose.Schema({
  categoryId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  name: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  }
},
{
  timestamps: {currentTime: () => Math.floor(Date.now() / 1000)}
})

Schema.virtual('category',{
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
})

Schema.virtual('specification',{
  ref: 'Specification',
  localField: '_id',
  foreignField: 'productId',
})

Schema.set('toObject', {virtuals: true});
Schema.set('toJSON', {virtuals: true});

export default Mongoose.model("Product", Schema);
