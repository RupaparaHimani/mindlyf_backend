let router = require('express').Router();

// Default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RedVelvet crafted with love!',
    });
});

// controllers
var contactController = require('./Controllers/contactController');
var loginController = require('./Controllers/loginController');
var userController = require('./Controllers/Users/userController');
var orderController = require('./Controllers/orderController');
var orderCaptureController = require('./Controllers/orderCaptureController');
var serviceController = require('./Controllers/serviceController');
var programController = require('./Controllers/programController');
var emailController = require('./Controllers/emailController');
var blogController = require('./Controllers/blogController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

//Login & Sign-up
router.route('/login')
    .post(loginController.auth);

router.route('/sign-up')
    .post(loginController.sign);

//Users
router.route('/users')
    .get(userController.list);

// search result
router.route('/getsearchresult/:searchparam')
    .get(userController.getsearchresult);

//User Details
router.route('/user/:userId')
    .get(userController.info);

router.route('/getCounsellors')
.get(userController.getCounsellors);


//Update User
router.route('/update')
    .post(userController.update);

router.route('/update_pdf')
    .post(userController.update_pdf);

router.route('/get_pdf/:user_Id')
      .get(userController.get_pdf);

//Capture Order
router.route('/order')
    .post(userController.order);

//Fetch Order
router.route('/getPackage')
.post(userController.getOrder);

// payment
router.route("/createOrder").post(orderController.createOrder);
router.route("/captureOrder").get(orderCaptureController.captureOrder);

router.route('/getservices')
.get(serviceController.getServices);

router.route('/getprograms')
.get(programController.getPrograms);

//email
router.route("/email").post(emailController.email);

router.route("/create_blog").post(blogController.create_blog);
router.route("/delete_blog/:id").delete(blogController.deleteBlog);
router.route("/updateBlog").post(blogController.updateBlog);
router.route("/get_blog/:id").get(blogController.get_blog);
router.route("/get_blogs").get(blogController.get_blogs);

router.route("/change_password").post(userController.change_password);

module.exports = router;
