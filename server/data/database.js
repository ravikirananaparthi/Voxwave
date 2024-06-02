import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "walky-takie",
    })
    .then((c) => {
      console.log(`DataBase Connected is connected with ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
