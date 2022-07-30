import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./gql/schema";
import resolvers from "./gql/resolvers";
import indexRouter from "./routes/index";
import path from "path";

const port = 3000;
const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
