import mongoose = require('mongoose');

import UserDoc = require('./models/user.model')
export const connectionString = 'mongodb+srv://root:root@cluster0.u54dzfd.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export const models = { UserDoc };