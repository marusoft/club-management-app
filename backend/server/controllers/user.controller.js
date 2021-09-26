import dotenv from "dotenv";
import pool from "../database/db.connection";
import Helper from "../utilities/utils";
import { createUser, findIfUserExist } from "../database/queries/sql";
import mailgun from "mailgun-js";

dotenv.config();

const DOMAIN = "sandbox187955923154416dae80cb063bf343f6.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

/**
 * Create User Account
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */

const createUsers = async (req, res) => {
  const { name, email, password, gender, role } = req.body;
  try {
    const hashpassword = Helper.hashPassword(password);
    const values = [name, email, hashpassword, gender, role];

    const { rows } = await pool.query(createUser, values);
    const { id } = rows[0];
    const token = Helper.generateToken({
      id,
      name,
      email,
    });
    return res.status(201).json({
      status: "success",
      data: {
        name,
        message: "Account successfully created",
        token: `Bearer ${token}`,
        id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Send User Email to create Account
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const signupEmail = async (req, res) => {
  const { name, email, password, gender, role } = req.body;
  const token = Helper.generateToken({
    name,
    email,
    password,
    gender,
    role,
  });
  console.log(`token1`, token);
  const data = {
    from: "hello@clubma.com",
    to: email,
    subject: `Hello ${name} this is your account activation link `,
    html: `
    <h2>Please click on the activation link to activate your account</h2>
    <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
    `,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    return res.status(200).json({
      message: "Email have been sent kindly activate your account",
    });
  });
};

/**
 * User Email Account Activation
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const activateAccount = async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      const payload = Helper.verifyToken(token);
      if (!payload) {
        return res.status(400).json({
          error: "Incorrect user credentials",
        });
      }
      const { name, email, password, gender, role } = payload;
      const value = [email];
      const { rowCount } = await pool.query(findIfUserExist, value);
      if (rowCount) {
        return res.status(409).json({
          status: 409,
          error: "Conflict, Email already registered, proceed to sigin...",
        });
      }
      const hashpassword = Helper.hashPassword(password);
      const values = [name, email, hashpassword, gender, role];

      const { rows } = await pool.query(createUser, values);
      return res.status(201).json({
        status: "success",
        data: {
          message: "Your Account successfully created",
        },
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

export default { createUsers, signupEmail, activateAccount };
