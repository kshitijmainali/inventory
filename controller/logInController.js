exports.logInu = (req, res) => {
  res.status(200).json({
    massage: 'go to /api/v1/auth/google to login'
  });
};
