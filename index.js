import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall , unmarshall} from "@aws-sdk/util-dynamodb";

const USERS_TABLE = process.env.USERS_TABLE;

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === "true") {
  dynamoDb = new DynamoDBClient({
    region: "localhost",
    endpoint: "http://localhost:8000",
  });
  console.log(dynamoDb);
} else {
  dynamoDb = new DynamoDBClient();
}

app.use(bodyParser.json({ strict: false }));

const apiRouter = express.Router();
// Get User endpoint
apiRouter.get("/users/:userId", async function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: marshall({
      userId: req.params.userId,
    }),
  };

  try {
    const result = await dynamoDb.send(new GetItemCommand(params));
    if (result.Item) {
      res.json(unmarshall(result.Item));
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get user" });
    }
  }
});

// Create User endpoint
apiRouter.post("/users", async function (req, res) {
  console.log(req.body);
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: marshall({
      userId: userId,
      name: name,
    }),
  };

  try {
    await dynamoDb.send(new PutItemCommand(params));
    res.json({ userId, name });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create user" });
    }
  }
});

app.use("/api", apiRouter);
export const handler = serverless(app);
