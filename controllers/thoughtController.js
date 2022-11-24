const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => {
        res.status(200).json(thought);
      })
      .catch((er) => {
        res.status(400).json(er);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).then((thought) => {
      !thought
        ? res.status(404).json({
            message: " no thought with this id found try a different id",
          })
        : res.json(thought);
    });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        res.status(200).json(thought);

        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought } },
          { new: true }
        );
      })
      .catch((er) => {
        res.status(400).json(er);
      });
  },
  updateThought(req, res) {
    Thought.updateOne({ _id: req.params.thoughtId }, req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.thoughtId })
      .then((thought) => {
        res.json({ message: "Successfully deleted thought" });
      })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((thought) => {
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }
    )
      .then((thought) => {
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
