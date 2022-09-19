import express from "express";
import { Login, LoginResult, Signup } from "../interface/users.interface";
import bycrpt from "bcrypt";
import usersModel from "../models/users.model";
import accesstokensModel from "../models/accesstokens.model";
import JWT from "jsonwebtoken";

const saltRounds = 10;
const TTL = 3600;

export const login = (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: Login = req.body;
    usersModel
      .findOne({ email: email })
      .then(async (result: LoginResult) => {
        if (!result) {
          return res.status(404).send({ code: 404, data: "Invalid User" });
        }
        console.log(result, "result");
        const passwordCompare = bycrpt.compareSync(password, result.password);
        console.log(passwordCompare, "passcompare");

        const object = {
          user_id: result._id,
        };
        if (!passwordCompare) {
          return res.status(401).send({ code: 401, error: "Invalid User" });
        }
        if (!result.isActive) {
          return res.status(403).send({ code: 403, error: "Inactive User" });
        }

        const secretKey = process.env.SECRETKEY;

        let accesstoken: string;

        if (secretKey) {
          accesstoken = JWT.sign(object, secretKey, { expiresIn: "1h" });
        } else {
          console.error(new Date(), "SECRECT KEY NOT FOUND");
          return res.status(409).send({ code: 409, data: "CODE ERROR" });
        }

        await accesstokensModel
          .insertMany([
            {
              accesstoken: accesstoken,
              ttl: TTL,
              user_id: result._id,
              email:email
            },
          ])
          .then(() => {
            const response = {
              username: result.username,
              email: result.email,
              _id: result._id,
              accesstoken: accesstoken,
            };
            return res.status(200).send({ code: 200, data: response });
          })
          .catch((err) => {
            console.error(new Date(), "INSERT ACCESS TOKEN ERROR", err);

            return res.status(409).send({ code: 409, data: "DB ERROR" });
          });
      })
      .catch((err) => {
        console.error(new Date(), "LOGIN DB ERROR", err);
        return res.status(409).send({ code: 409, error: "DB ERROR" });
      });
  } catch (err) {
    console.error(new Date(), "LOGIN CODE ERROR", err);
    return res.status(409).send({ code: 409, error: "CODE ERROR" });
  }
};

export const signup = (req: express.Request, res: express.Response) => {
  try {
    const { first_name,last_name, email, password, confirmPassword }: Signup = req.body;
    if (password != confirmPassword) {
      return res.status(403).send({ code: 403, error: "Invalid Password" });
    }
    usersModel
      .findOne({
        email: email,
      })
      .then((result) => {
        try {
          if (result) {
            return res
              .status(409)
              .send({ code: 409, error: "User already exists" });
          }
          const salt = bycrpt.genSaltSync(saltRounds);
          const hashPassword = bycrpt.hashSync(password, salt);
          usersModel
            .insertMany({
              first_name,
              last_name,
              email,
              password: hashPassword,
            })
            .then((userInsert) => {
              return res.status(200).send({ code: 200, data: userInsert });
            })
            .catch((err) => {
              console.error(new Date(), "INSERT USER DB ERROR", err);
              return res.status(409).send({ code: 409, err: "DB ERROR" });
            });
        } catch (err) {
          console.error(new Date(), "INSERT USER CODE ERROR", err);
          return res.status(409).send({ code: 409, error: "CODE ERROR" });
        }
      })
      .catch((err) => {
        console.error(new Date(), "FIND USER DB ERROR", err);
        return res.status(409).send({ code: 409, data: "DB ERROR" });
      });
  } catch (err) {
    console.error(new Date(), "SIGNUP USER CODE ERROR", err);
    return res.status(409).send({ code: 409, data: "DB ERROR" });
  }
};
