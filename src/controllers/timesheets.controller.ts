import timeSheets from "../models/timesheets.model";
import express from "express";
import moment from "moment";
import { PostTimeSheet } from "../interface/timesheets.interface";

export const postTimeSheet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const body: PostTimeSheet[] = req.body;
    timeSheets
      .insertMany(body)
      .then((result) => {
        return res.status(200).send({ code: 200, data: result });
      })
      .catch((err) => {
        console.error(new Date(), "ERROR INSERTING TIMESHEET", err);
        return res.status(409).send({ code: 409, error: "DB ERROR" });
      });
  } catch (err) {
    console.error(new Date(), "CODE ERROR INSERTING TIMESHEET", err);
    return res.status(409).send({ code: 409, error: "CODE ERROR" });
  }
};

export const getTimeSheet = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const date = req.query.date;
    timeSheets
      .find({
        date: date,
      })
      .then((data) => {
        return res.status(200).send({ code: 200, data: data });
      })
      .catch((err) => {
        console.error("ERROR FETCHING TIMESHEET", err);
        return res.status(409).send({ code: 409, error: "DB ERROR" });
      });
  } catch (err) {
    console.error("CODE ERROR FETCHING TIME SHEET", err);
    return res.status(409).send({ code: 409, error: "CODE ERROR" });
  }
};

// export const updateData = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     timeSheets.find().then((data) => {
//       let resultData: any[] = [];
//       data.forEach((element) => {
//         console.log(element.datetime, "element");

//         let date =
//           element.datetime > 8
//             ? moment(new Date(element.datetime)).format("YYYY-MM-DD")
//             : element.datetime;

//         let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//         resultData.push({
//           date: date,
//           timezone: timezone,
//           checked: element.checked,
//           name: element.name,
//           value: element.value,
//           duration: element.duration,
//         });
//         timeSheets.updateOne({

//         })
//       });

//       res.status(200).send({ code: 200, data: resultData });
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
