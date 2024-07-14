// middleware.ts

import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

// Define a custom interface for Request with additional properties
export interface CustomRequest extends Request {
  requestId: string; // Add requestId property to Request
}

// Middleware function to add unique request ID to each request
export function requestIdMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  req.requestId = uuidv4(); // Assign a unique ID to the request object
  next();
}
