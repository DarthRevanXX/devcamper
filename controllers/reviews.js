const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");

// @desc Get reviews
// @route Get api/v1/reviews
// @route Get api/v1/bootcamps/:bootcampId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    });

    return res.status(200).json({
      status: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});