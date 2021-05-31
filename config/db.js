const mongoose = require("mongoose");

const DB_CONNECT = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Mongo is connected successfuly on ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = DB_CONNECT;
