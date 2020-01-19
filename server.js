const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const port = process.env.PORT || 5000;
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connection successfull'));

app.listen(port, () => {
	console.log(`server running in port ${port}`);
});
module.exports = DB;
