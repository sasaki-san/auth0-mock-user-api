const express = require("express");
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();
const checkJwt = auth();

const users = require("./users-list")

const checkUser = (req, res, next) => {

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(":")

  const user = users.find(u => u.email === username && u.password === password)

  if (!user) {
    return res.boom.notFound("user_not_found")
  }

  req.user = user

  next()
}

const checkCustomer = (req, res, next) => {

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(":")

  const user = users.find(u => u.customer_id === username && u.password === password)

  if (!user) {
    return res.boom.notFound("user_not_found")
  }

  req.user = user

  next()
}

/**
 * Health check
 */
router.get("/ping", async (req, res) => {
  try {
    const message = "users route working";
    res.json({
      status: 200,
      message
    });
  } catch (error) {
    console.log(error)
    return res.boom.badRequest(error)
  }
});

router.get("/list", async (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.log(error)
    return res.boom.badRequest(error)
  }
});

/**
 * Profile 
 */
router.get("/profile", checkUser, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error)
    return res.boom.badRequest(error)
  }
});

/**
 * Profile by CustomerId
 */
router.get("/profile-by-customerId", checkCustomer, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error)
    return res.boom.badRequest(error)
  }
});

/**
 * Users by email
 */
router.get("/users-by-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.boom.notFound("user_not_found")
    }
    res.json(user);
  } catch (error) {
    console.log(error)
    return res.boom.badRequest(error)
  }
});

module.exports = router;