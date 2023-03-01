import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      unique: true,
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
