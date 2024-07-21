import jwt from "jsonwebtoken";

export function verifyUserToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return null;
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
}
