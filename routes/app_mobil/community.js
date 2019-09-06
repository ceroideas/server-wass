const express = require('express');
let CommunityController = require('../../controllers/communityController');

let router = express.Router();

router.route('/communities/upload-data').get(CommunityController.uploadData);
router.route('/communities').get(CommunityController.findAll);

module.exports = router;