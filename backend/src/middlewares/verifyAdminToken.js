const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    console.log("Received token:", token);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }

        console.log("Decoded user:", user);

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only' });
        }

        req.user = user;
        next();
    });
};

module.exports = verifyAdminToken;
