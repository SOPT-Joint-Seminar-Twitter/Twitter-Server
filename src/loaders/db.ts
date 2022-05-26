import mongoose from 'mongoose';
import config from '../config';
import twit from '../models/twit';

const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURI);

		mongoose.set('autoCreate', true);

		console.log('Mongoose Connected ...');

		twit.createCollection().then(function (collection) {
			console.log('Twit Collection is created!');
		});
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
