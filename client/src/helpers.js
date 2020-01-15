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
		'December',
	];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return day + ' ' + months[monthIndex] + ' ' + year;
};

module.exports = { isEmpty, formatDate };
