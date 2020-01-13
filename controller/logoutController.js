exports.logOutu = (req, res) => {
  console.log(req.user);
  req.logout();
  res.redirect('/');
};
