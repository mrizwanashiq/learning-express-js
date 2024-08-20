import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
const port = 3006;

app.use(express.json());
app.use(cookieParser("yourSecretKey")); // For signed cookies

app.post("/login", (req, res) => {
  // Authenticate user
  const user = {
    username: req.body.username ?? "rizwan",
    email: req.body.email ?? "example@rizwan.com",
  };

  // Generate JWT
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

  // Set JWT as a cookie
  res.cookie("authToken", token, {
    httpOnly: true, // Accessible only by the web server
    secure: true, // Ensure the browser only sends the cookie over HTTPS
    maxAge: 3600000, // 1 hour
  });

  res.send("Logged in and JWT set in cookie!");
});

app.get("/dashboard", (req, res) => {
  // Get JWT from cookie
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    // Verify JWT
    const verifiedUser = jwt.verify(token, JWT_SECRET);
    res.send(`Welcome to your dashboard, ${verifiedUser.username}`);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.send("Logged out successfully!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
