import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
