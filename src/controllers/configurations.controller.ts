import configurations from "../models/configurations.model";
import express from "express";
import { PostConfig } from "../interface/configurations.interface";

export const postConfig = (req: express.Request, res: express.Response) => {
  try {
    const data: PostConfig[] = req.body.data;
    configurations
      .insertMany(data)
      .then((result) => {
        return res.status(200).send({ code: 200, data: result });
      })
      .catch((err) => {
        console.error(new Date(), "ERROR INSERTING CONFIGURATIONS", err);
        return res.status(409).send({ code: 409, error: "DB ERROR" });
      });
  } catch (err) {
    console.error(new Date(), "CODE ERROR INSERTING CONFIGURATIONS", err);
    return res.status(409).send({ code: 409, error: "CODE ERROR" });
  }
};

export const getConfig = (req: express.Request, res: express.Response) => {
  try {
    configurations
      .find({
        isActive: true,
      })
      .then((result) => {
        return res.status(200).send({ code: 200, data: result });
      })
      .catch((err) => {
        console.error(new Date(), "ERROR FETCHING CONFIGURATIONS", err);
        return res.status(409).send({ code: 409, error: "DB ERROR" });
      });
  } catch (err) {
    console.error(new Date(), "CODE ERROR FETCHING CONFIGURATIONS", err);
    return res.status(409).send({ code: 409, error: "CODE ERROR" });
  }
};
