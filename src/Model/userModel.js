var mongoose = require('mongoose');

// Setup schema
var contactSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: String,
    phone: String,
    devices: Array,
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}
