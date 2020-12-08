const request = require('request');
const url = require('url');

const successPaymentUrl = 'https://www.mindlyf.com';
// const successPaymentUrl = 'http://localhost:3000';
exports.captureOrder = function (req, res) {
  try {
    let url_parts = url.parse(req.url, true);
    let responseData = url_parts.query;
    if (responseData.payment_id) {
      // let paymentDetails = {
      //   payment_status: responseData.payment_status,
      //   order_id: responseData.payment_request_id,
      //   payment_id: responseData.payment_id
      // };
      // SAVE PAYMENT SUCCESS DATA to DB
      // saveToDB(paymentDetails);

      // PAYMENT SUCCESS AND REDIRECTING USER TO CLIENT SIDE
      return res.redirect(successPaymentUrl);
    } else {
      return res.status(500).json({
        message: "Unable to save payment data"
      });
    }

  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
      error: err
    });
  }
}
