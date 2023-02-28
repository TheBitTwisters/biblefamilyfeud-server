import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      unique: true,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListItem',
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model('List', listSchema);

export default List;
