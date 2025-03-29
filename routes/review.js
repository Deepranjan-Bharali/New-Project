const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const {validateReview,isLoggedin,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


// Reviews
// Post Route
router.post("/",isLoggedin,validateReview, wrapAsync(reviewController.createReview));
// Delete Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;