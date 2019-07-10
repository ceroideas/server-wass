const express = require('express');
let UserController = require('../../controllers/userController');
let BlogController = require('../../controllers/blogController');
let AreaController = require('../../controllers/areaController');
let CommentController = require('../../controllers/commentController');

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


module.exports = router;