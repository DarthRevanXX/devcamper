const express = require('express');
const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    deleteBootCamp,
    updateBootCamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')

const advancedResults = require('../middleware/advancedResults')

// Include other ressource routers
const courseRouter = require('./courses')

const router = express.Router();

// Re-routes into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootCamps).post(createBootCamp);

router.route('/:id').get(getBootCamp).put(updateBootCamp).delete(deleteBootCamp);

router.route('/:id/photo').put(bootcampPhotoUpload)


module.exports = router;