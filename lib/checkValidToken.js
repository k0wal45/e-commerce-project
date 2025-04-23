import jwt from "jsonwebtoken";

export async function checkValidToken(req) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  if (!decode) {
    return false;
  }
  // Check if the token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  if (decode.exp < currentTime) {
    return false; // Token is expired
  }
  // Check if the token is valid
  return decode;
}
