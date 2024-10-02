exports.getAll = (req, res) => {
  res.send("Get All Route");
};

exports.getOneById = (req, res) => {
  res.send(`Get By id ${req.params.id}`);
};

exports.postOne = (req, res) => {
  res.send(`Post By id ${req.body.id}`);
};

exports.updateOne = (req, res) => {
  res.send(`Update By Id ${req.body.id}`);
};

exports.deleteOne = (req, res) => {
  res.send(`Delete By id ${req.body.id}`);
};
