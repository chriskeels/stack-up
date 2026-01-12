const jwt = require('jsonwebtoken');

export const authMiddleware = (req) => {
  const header = req.headers.get('authorization');
  if (!header) return null;

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
};
