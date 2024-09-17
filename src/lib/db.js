import mongoose from 'mongoose';

const connection = {};

async function connectToDB() {
  if (connection.isConnected) {
    return;
  }

  // Set up a new connection
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default connectToDB;