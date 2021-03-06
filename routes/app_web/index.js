const express = require('express');
let UserController = require('../../controllers/userController');
let BlogController = require('../../controllers/blogController');
let AreaController = require('../../controllers/areaController');
let CommentController = require('../../controllers/commentController');
let PlaceController = require('../../controllers/placeController');
let CommunityController = require('../../controllers/communityController');

const router = express.Router();

/*
* @@ Users
*/
router.route('/users')
    .post(UserController.create)
    .get(UserController.findAll);

router.route('/users/:userId')
    .put(UserController.update)
    .get(UserController.findOne)
    .delete(UserController.delete);

router.route('/users/lasts/:limit')
    .get(UserController.findLast);

/*
* @@ Areas
*/
router.route('/areas')
    .post(AreaController.create)
    .get(AreaController.findAll);

router.route('/areas/:areaId')
    .put(AreaController.update)
    .get(AreaController.findOne)
    .delete(AreaController.delete);


/*
* @@ Comments
*/
router.route('/comments')
    .post(CommentController.create)
    .get(CommentController.findAll);

router.route('/comments/:commentId')
    .put(CommentController.update)
    .get(CommentController.findOne)
    .delete(CommentController.delete);

router.route('/comments/lasts/:limit')
    .get(CommentController.findLast);

router.route('/comments/lasts/community/:limit/:communityId')
    .get(CommentController.findLastCommunity);

router.route('/comments/reports')
    .post(CommentController.setReports);
/*
* @@ Blogs
*/
router.route('/blogs')
    .post(BlogController.create)
    .get(BlogController.findAll);

router.route('/blogs/:blogId')
    .put(BlogController.update)
    .get(BlogController.findOne)
    .delete(BlogController.delete);

/*
* @@ Places
*/
router.route('/places')
    .post(PlaceController.create)
    .get(PlaceController.findAll);
router.route('/places/updata')
    .get(PlaceController.uploadData)

router.route('/places/:placeId')
    .put(PlaceController.update)
    .get(PlaceController.findOne)
    .delete(PlaceController.delete);

/*
* @@ communities
*/
router.route('/communities')
    .post(CommunityController.create)
    .get(CommunityController.findAll);
router.route('/communities/upload-data')
    .get(CommunityController.uploadData)

router.route('/communities/:communityId')
    .put(CommunityController.update)
    .get(CommunityController.findOne)
    .delete(CommunityController.delete);
 

module.exports = router;