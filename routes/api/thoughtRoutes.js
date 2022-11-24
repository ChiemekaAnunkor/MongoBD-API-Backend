const router = require("express").Router();

const {
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  getSingleThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/reaction/:thoughtId").post(addReaction);
router.route("/reaction/:thoughtId/:reactionId").delete(removeReaction);
module.exports = router;
