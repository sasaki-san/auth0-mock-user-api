const express = require("express");
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();
const checkJwt = auth();

/**
 * Gets a discount coupon 
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

module.exports = router;