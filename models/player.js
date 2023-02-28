import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;
