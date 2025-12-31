import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof decoded == "string") {
    return null;
  }

  if (!decoded || !decoded.id) {
    return null;
  }

  return decoded.id;
}
