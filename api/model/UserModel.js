'use strict'
const mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    lowercase: true,
    dropDups: true
  },
  password: {
    type: String,
    required: [true, 'Please enter password']
  },
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  Created_date: {
    type: Date,
    default: Date.now
  }
}, { usePushEach: true });


UserSchema.methods.toJSON = function(params) {
  const obj = this.toObject()
  delete obj.__v
  delete obj.Created_date
  return Object.assign(obj, params)
}

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema, 'users');