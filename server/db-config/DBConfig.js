import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((connectionObject) =>
        console.log(`MONGODB CONNECTED`, connectionObject.connection.host)
      );
  } catch (error) {
    console.log(`Error while connecting to DB : ${error.message}`);
    process.exit(); // if DB not connected, exit the process
  }
};

export default connectDB;
