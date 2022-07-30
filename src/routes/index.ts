import axios, { AxiosResponse, AxiosError } from "axios";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `query {
    getAllItems {
        _id
        item
        amount
        value
      }
    }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }: AxiosResponse) => {
      res.render("index", {
        title: "Hey",
        message: "Hello there!",
        data,
      });
    })
    .catch((err: AxiosError) => {
      res.json(err);
    });
});

router.delete("/delete", function (req: Request, res: Response) {
  axios
    .post(
      "http://localhost:3000/graphql",
      {
        query: `mutation($input: ID!) {
          deleteItem(input: $input) {
              _id
              item
              amount
              value
          }
      }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }: AxiosResponse) => {
      console.log(data);
      res.json(data);
    })
    .catch((err: AxiosError) => {
      res.json(err);
    });
});

router.get("/ejs", function (req: Request, res: Response) {
  res.render("index", { title: "Hey", message: "Hello there!" });
});

export default router;
