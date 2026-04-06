const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    whatsapp: {
        type: String,
        required: [true, 'WhatsApp number is required'],
        trim: true
    },
    profession: {
        type: String,
        trim: true
    },
    tripType: {
        type: String,
        trim: true,
        default: 'General Inquiry'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
