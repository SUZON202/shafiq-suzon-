const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        const email = req.user?.email; // টোকেন থেকে প্রাপ্ত ইউজারের ইমেইল
        const user = await User.findOne({ email });
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden Access: Admin Only" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = verifyAdmin;
