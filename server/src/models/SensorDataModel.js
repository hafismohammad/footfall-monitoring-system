import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
});

export default mongoose.model("SensorData", SensorDataSchema);
