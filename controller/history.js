const [, PurModel, SellModel] = require('./../models/enterModel');

exports.entryHistory = async spec => {
  const enHis = await PurModel.create(spec);
  console.log(enHis);
};

exports.sellHistory = async spec => {
  const sHis = await SellModel.create(spec);
  console.log(sHis);
};
