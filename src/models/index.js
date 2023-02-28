import mongoose from 'mongoose';
import Game from './game';
import List from './list';
import ListItem from './list-item';
import Player from './player';

const connectDb = () => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = {
  Game,
  List,
  ListItem,
  Player,
};

export { connectDb };

export default models;
