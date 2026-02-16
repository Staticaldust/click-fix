import { Request, Response, NextFunction } from 'express';

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/**
 * Logging middleware
 * Logs all incoming requests with method, URL, status code, and response time
 * Errors (4xx, 5xx) are displayed in red
 */
export default function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Log incoming request
  console.log(
    `${colors.gray}[${timestamp}]${colors.reset} ${colors.cyan}${req.method}${colors.reset} ${req.url}`
  );

  // Capture the original res.json and res.send to log response
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = function (body: any) {
    logResponse(res.statusCode, startTime, req.method, req.url);
    return originalJson(body);
  };

  res.send = function (body: any) {
    logResponse(res.statusCode, startTime, req.method, req.url);
    return originalSend(body);
  };

  next();
}

/**
 * Log response with appropriate color based on status code
 */
function logResponse(
  statusCode: number,
  startTime: number,
  method: string,
  url: string
) {
  const duration = Date.now() - startTime;
  const timestamp = new Date().toISOString();

  let statusColor = colors.green;
  if (statusCode >= 500) {
    statusColor = colors.red;
  } else if (statusCode >= 400) {
    statusColor = colors.red;
  } else if (statusCode >= 300) {
    statusColor = colors.yellow;
  }

  console.log(
    `${colors.gray}[${timestamp}]${colors.reset} ${colors.cyan}${method}${colors.reset} ${url} ${statusColor}${statusCode}${colors.reset} ${colors.gray}${duration}ms${colors.reset}`
  );
}
