const { User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .then((users) => {
        return res.json(users);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .then((user) => {
        !user
          ? res.status(404).json({
              message: " no user with this id found try a different id",
            })
          : res.json(user);
      });
  },
  createUser(req, res) {
    console.log(req.params);
    console.log("======");
    console.log(req.body);

    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.updateOne({ _id: req.params.userId }, req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.deleteOne({ _id: req.params.userId })
      .then((user) => {
        res.json({ message: "Successfully deleted User" });
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeFriends(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.friendsId } } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
