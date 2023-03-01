import mongoose from 'mongoose';

const listitemSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    },
    title: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
  },
  { timestamps: true }
);

const ListItem = mongoose.model('ListItem', listitemSchema);

export default ListItem;
