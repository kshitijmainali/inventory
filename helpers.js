const isEmpty = (value) =>
	value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0);

const generateTransactionCode = () => {
	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const seconds = date.getSeconds();
	const random = Math.floor(Math.random() * 100000 + 1);
	const transactionCode = '' + random + day + month + seconds;

	return parseInt(transactionCode);
};

module.exports = { isEmpty, generateTransactionCode };
