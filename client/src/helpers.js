const isEmpty = (value) =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);

const formatDate = (date) => {
	date = new Date(date);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return day + ' ' + months[monthIndex] + ' ' + year;
};

const generateRandom = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const generateTransactionCode = () => {
	let date = new Date();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let seconds = date.getSeconds();
	let random = generateRandom(10000, 100000);
	let transactionCode = '' + random + day + month + seconds;

	return parseInt(transactionCode);
};

const generateProductCode = () => {
	let random = generateRandom(10000, 100000);
	let alpha = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];
	let alpha1 = alpha[generateRandom(0, 26)];
	let alpha2 = alpha[generateRandom(0, 26)];
	const productCode = alpha1 + alpha2 + random;

	return productCode;
};
module.exports = { isEmpty, formatDate, generateTransactionCode, generateProductCode };
