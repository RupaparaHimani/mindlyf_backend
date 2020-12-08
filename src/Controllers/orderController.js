const Insta = require('instamojo-nodejs');

const API_KEY = '6c6ddddf3fe637195dfed23f8ce99dd9'; // TODO: take from env variable
const AUTH_KEY = '2e232f5f7fbacc48d6ba839d9d27ccb9';  // TODO: take from env variable
const IS_TEST_MODE = false;  // TODO: take from env variable
const serviceTypes = {  // TODO: move it to a better place
  'TYPE1': 1000,
  'TYPE2': 2500,
  'TYPE3': 4000
};

exports.createOrder = function (req, res) {
  console.log("--------------------------");

  Insta.setKeys(API_KEY, AUTH_KEY);
  Insta.isSandboxMode(IS_TEST_MODE);
  console.log("============create order");
  try {
    const data = new Insta.PaymentData();
    const { body = {} } = req;
    const { serviceType, purpose, buyer_name, email, phone, redirect_url, userData } = body;
    data.purpose = purpose; // MANDATORY
    data.amount = serviceTypes[serviceType]; // MANDATORY
    data.buyer_name = buyer_name; // MANDATORY
    data.redirect_url = redirect_url // MANDATORY
    data.email = email; // MANDATORY
    data.phone = phone; // MANDATORY
    data.send_email = false;
    data.webhook = '';
    data.send_sms = false;
    data.allow_repeated_payments = false;
    if(service_id != undefined){
      data.serviceID = service_id
    }else{
      data.programID = program_id
    }

    Insta.createPayment(data, function(error, response) {
      if (error) {
        // some error
        return res.status(500).json({
          message: 'Error while creating payment request to Instamojo',
          error: error
        });
      } else {
        // Payment redirection link at response.payment_request.longurl
        const responseData = JSON.parse(response);
        if(!responseData.payment_request.longurl) {
          return res.status(500).json({
            message: "Error while creating a payment order at Instamojo",
            error: response
          });
        }
        const redirectUrl = responseData.payment_request.longurl;
        return res.status(200).json(redirectUrl);
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating a payment order at Mindlyf",
      error: err.message
    });
  }
}
