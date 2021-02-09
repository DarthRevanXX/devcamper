const express = require("express");
const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

// Include other ressource routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-routes into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootCamps)
  .post(protect, authorize("publisher", "admin"), createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorize("publisher", "admin"), updateBootCamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootCamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
