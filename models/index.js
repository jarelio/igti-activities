import mongoose from 'mongoose';
import gradeModel from './gradeModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.models = { gradeModel };

export { db };
