exports.getAll = (req, res) => {
  res.send("This is get All Order Page: ");
};

exports.getOne = (req, res) => {
  res.send(`This is get one by ${req.params.id} page`);
};

exports.postOne = (req, res) => {
  res.send(`This is post of products ${req.params}`);
};
