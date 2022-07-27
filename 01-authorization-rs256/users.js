const express = require("express");
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();
const checkJwt = auth();

/**
 * Health check
 */
router.get("/ping", checkJwt, async (req, res) => {
  try {
    const message = "users route working";
    res.json({
      status: 200,
      message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

/**
 * Profile 
 */
router.get("/profile", async (req, res) => {
  try {
    const user = {
      user_id: "1234",
      nickname: "Jane",
      email: "janedoe@gmail.com"
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;