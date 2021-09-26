import express from "express";
import userController from "../controllers/user.controller";
import UserInputValidation from '../middlewares/user.middleware';
import UserAuth from '../middlewares/auth';


const { createUsers, signupEmail, activateAccount } = userController;
const { ValidateCreateUserInput } = UserInputValidation;
const { isAdmin, verifyUserToken } = UserAuth;


const userRoute = express.Router();


userRoute.post('/auth/signup', ValidateCreateUserInput, createUsers);
userRoute.post('/auth/signupemail', ValidateCreateUserInput, signupEmail);
userRoute.post('/auth/activateaccount', activateAccount);


export default userRoute;