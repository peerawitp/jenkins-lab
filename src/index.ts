import { Elysia } from "elysia";
import * as fs from "fs";
import { exec } from "child_process";
import * as crypto from "crypto";
import * as path from "path";

// Vulnerability 1: Hardcoded credentials
const API_KEY = "sk-1234567890abcdef";
const DATABASE_PASSWORD = "admin123";
const JWT_SECRET = "supersecret";

// Vulnerability 2: Weak cryptographic algorithm
const weakHash = crypto.createHash("md5");

// Vulnerability 3: SQL Injection vulnerability
function getUserData(userId: string) {
  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  // This is vulnerable to SQL injection
  return query;
}

// Vulnerability 4: Command injection vulnerability
function executeCommand(userInput: string) {
  exec(`ls -la ${userInput}`, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

// Vulnerability 5: Path traversal vulnerability
function readFile(filename: string) {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, "utf8");
}

// Vulnerability 6: Insecure random number generation
function generateToken() {
  return Math.random().toString(36).substr(2, 9);
}

// Vulnerability 7: XML External Entity (XXE) vulnerability
function parseXML(xmlData: string) {
  // Vulnerable XML parsing without disabling external entities
  const xml2js = require("xml2js");
  const parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
  });
  return parser.parseString(xmlData);
}

// Vulnerability 8: Information disclosure
function getErrorDetails(error: any) {
  return {
    message: error.message,
    stack: error.stack,
    env: process.env,
    config: {
      dbPassword: DATABASE_PASSWORD,
      apiKey: API_KEY,
    },
  };
}

// Vulnerability 9: Insecure HTTP headers
const app = new Elysia()
  .get("/", () => "Hello Jenkins!")

  // Vulnerable endpoint - SQL injection
  .get("/user/:id", ({ params }) => {
    const userData = getUserData(params.id);
    return userData;
  })

  // Vulnerable endpoint - Command injection
  .post("/execute", ({ body }) => {
    const command = (body as any).command;
    executeCommand(command);
    return "Command executed";
  })

  // Vulnerable endpoint - Path traversal
  .get("/file/:filename", ({ params }) => {
    try {
      const content = readFile(params.filename);
      return content;
    } catch (error) {
      return getErrorDetails(error);
    }
  })

  // Vulnerable endpoint - Weak token generation
  .get("/token", () => {
    return {
      token: generateToken(),
      apiKey: API_KEY,
    };
  })

  // Vulnerable endpoint - XXE
  .post("/xml", ({ body }) => {
    const xmlData = (body as any).xml;
    const result = parseXML(xmlData);
    return result;
  })

  // Vulnerable endpoint - Information disclosure
  .get("/debug", () => {
    return {
      environment: process.env,
      secrets: {
        apiKey: API_KEY,
        dbPassword: DATABASE_PASSWORD,
        jwtSecret: JWT_SECRET,
      },
      serverInfo: {
        version: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime(),
      },
    };
  })

  // Vulnerability 10: Insecure cookie settings
  .get("/login", ({ set }) => {
    set.headers["Set-Cookie"] =
      "sessionId=abc123; HttpOnly=false; Secure=false; SameSite=None";
    return "Logged in";
  })

  // Vulnerability 11: Missing input validation
  .post("/eval", ({ body }) => {
    const code = (body as any).code;
    try {
      // Extremely dangerous - arbitrary code execution
      const result = eval(code);
      return { result };
    } catch (error) {
      return getErrorDetails(error);
    }
  })
  .listen(9000);

// Vulnerability 12: Logging sensitive information
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
console.log(`Database password: ${DATABASE_PASSWORD}`);
console.log(`API Key: ${API_KEY}`);
console.log(`JWT Secret: ${JWT_SECRET}`);

// Vulnerability 13: Insecure file permissions
fs.chmodSync(__filename, 0o777);

// Vulnerability 14: Using deprecated/vulnerable functions
process.on("uncaughtException", (error) => {
  console.log("Uncaught exception:", error.stack);
  // Don't exit - this can lead to undefined behavior
});

// Vulnerability 15: Weak SSL/TLS configuration
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default app;
