import Helper from '../helperUtils/Utils';
import pool from '../database/dbConnection';
import { findAGif, findAnArticle } from '../database/queries/sql';

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
    * verifyAuthHeader
    * @method verifyAuthHeader
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
    }
    return payload;
  }

  /**
    * verifyUserToken
    * @method verifyUserToken
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static verifyUserToken(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated.';
    }

    if (error) {
      return res.status(status).json({ status, error });
    }
    req.user = payload;
    next();
  }

  /**
    * verify isAdmin
    * @method isAdmin
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static isAdmin(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
      return res.status(status).json({
        status,
        error,
      });
    }

    if (payload && payload.error === 'token') {
      status = 401;
      error = 'Token provided cannot be authenticated.';
      return res.status(status).json({
        status,
        error,
      });
    }

    if (payload.role !== 'admin') {
      return res.status(403).json({
        status: 403,
        error: 'Only admin can invite a memeber to a club',
      });
    }
    next();
  }

  /**
    * verify isClubOwner
    * @method isOwner
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @return {object} JSON representing success message
    * @param {object} next
    * @memberof UserAuthentication
    */
  static async isClubOwner(req, res, next) {
    const userid = req.user.id;
    const clubid = req.params.club_id;
    const value = Number(clubid);

    try {
      const { rows, rowCount } = await pool.query(findAClub, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Club not found.',
        });
      }
      if (userid !== rows[0].club_owner_id) {
        return res.status(401).json({
          status: 401,
          error: 'You can not create a club.',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

 
}

export default UserAuthentication;