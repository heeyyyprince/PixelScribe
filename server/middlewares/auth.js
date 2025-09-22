import jwt from 'jsonwebtoken'; 

// User authentication middleware
const authUser = async (req, res, next) => {
    // Extract the token from headers (check both 'token' and 'authorization')
    const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode?.id) {
            // Attach user ID to request object (not body) to avoid being overwritten by multer
            req.userId = tokenDecode.id;
        } else {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Export the middleware
export default authUser; 
