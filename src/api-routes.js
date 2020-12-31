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
var testController = require('./Controllers/testController');
var appoinmentController = require('./Controllers/appoinmentController');
var referralController = require('./Controllers/referralController');
var billController = require('./Controllers/billController');

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
//Users
router.route('/offline_list')
    .get(userController.offline_list);

router.route('/doctors')
    .get(userController.doctors);

// search result
router.route('/getsearchresult/:searchparam')
    .get(userController.getsearchresult);

//User Details
router.route('/user/:userId')
    .get(userController.info);

router.route('/getCounsellors')
.get(userController.getCounsellors);

router.route("/delete_user/:id").delete(userController.deleteUser);
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

router.route('/getprograms') .get(programController.getPrograms);
router.route('/get_ordered_programs') .get(programController.getOrderedPrograms);
router.route("/create_program").post(programController.create_program);
router.route("/get_program/:id").get(programController.get_program);
router.route("/update_program").post(programController.update_program);
router.route("/delete_program/:id").delete(programController.delete_program);

//email
router.route("/email").post(emailController.email);

router.route("/create_blog").post(blogController.create_blog);
router.route("/delete_blog/:id").delete(blogController.deleteBlog);
router.route("/updateBlog").post(blogController.updateBlog);
router.route("/get_blog/:id").get(blogController.get_blog);
router.route("/get_blogs").get(blogController.get_blogs);

// Appoinment
router.route("/create_appoinment").post(appoinmentController.create_appoinment);
router.route("/get_appoinments").post(appoinmentController.get_appoinments);
router.route("/get_appoinment/:id").get(appoinmentController.get_appoinment);
router.route("/update_appoinment").post(appoinmentController.update_appoinment);
router.route("/delete_appoinment/:id").delete(appoinmentController.delete_appoinment);
router.route("/get_appoinment_DrTime/:doctorID/:Date").get(appoinmentController.get_appoinment_DrTime);

// Referral
router.route("/create_referral").post(referralController.create_referral);
router.route("/get_referrals").get(referralController.get_referrals);
router.route("/get_referral/:id").get(referralController.get_referral);
router.route("/update_referral").post(referralController.update_referral);
router.route("/delete_referral/:id").delete(referralController.delete_referral);

// Bill
router.route("/get_bills").get(billController.getBills);
router.route("/remaining_bill_patient_list").get(billController.remaining_bill_patient_list);
router.route("/get_bill_number/:user_id").get(billController.get_bill_number);
router.route("/generate_bill").post(billController.generate_bill);
router.route("/getPaymentPendingPatient/:user_id").get(billController.getPaymentPendingPatient);
router.route("/get_bill_payments").get(billController.get_bill_payments);


router.route("/get_tests").get(testController.get_tests);
router.route("/get_paid_tests").get(testController.get_paid_tests);
router.route("/create_test").post(testController.create_test);
router.route("/change_password").post(userController.change_password);

router.route("/uploadCounsellorPdf").post(userController.uploadCounsellorPdf);



module.exports = router;
