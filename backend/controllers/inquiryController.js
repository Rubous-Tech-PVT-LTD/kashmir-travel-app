const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry
// @route   POST /api/v1/inquiries
const createInquiry = async (req, res) => {
    try {
        const { name, email, whatsapp, profession, tripType } = req.body;

        if (!name || !email || !whatsapp) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (Name, Email, WhatsApp)'
            });
        }

        const inquiry = await Inquiry.create({
            name,
            email,
            whatsapp,
            profession,
            tripType
        });

        res.status(201).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        console.error('Error in createInquiry:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not save inquiry'
        });
    }
};

// @desc    Get all inquiries
// @route   GET /api/v1/inquiries
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        console.error('Error in getAllInquiries:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not fetch inquiries'
        });
    }
};

module.exports = {
    createInquiry,
    getAllInquiries
};
