import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const TODOS_TABLE = process.env.TODOS_TABLE;

const app = express();

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

apiRouter.get("/health", function (req, res) {
  res.send("Hello World!");
});

// Get Todo endpoint
apiRouter.get("/todos/:id", async function (req, res) {
  const params = {
    TableName: TODOS_TABLE,
    Key: marshall({
      itemId: req.params.id,
    }),
  };

  try {
    const result = await dynamoDb.send(new GetItemCommand(params));
    if (result.Item) {
      res.json(unmarshall(result.Item));
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get item" });
    }
  }
});

// Update Todo endpoint
apiRouter.put("/todos/:id", async function (req, res) {
  const { name, completed, duedate } = req.body;

  try {
    const getParams = {
      TableName: TODOS_TABLE,
      Key: marshall({
        itemId: req.params.id,
      }),
    };
    const getResult = await dynamoDb.send(new GetItemCommand(getParams));
    if (!getResult.Item) {
      res.status(404).json({ error: "Item not found" });
    }
    const oldItem = unmarshall(getResult.Item);
    const params = {
      TableName: TODOS_TABLE,
      Item: marshall({
        itemId: req.params.id,
        name: name || oldItem.name,
        completed:
          typeof completed === "boolean" ? completed : oldItem.completed,
        duedate: duedate || oldItem.duedate,
      }),
    };
    await dynamoDb.send(new PutItemCommand(params));
    res.sendStatus(202);
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not update item" });
    }
  }
});

// Delete Todo endpoint
apiRouter.delete("/todos/:id", async function (req, res) {
  const params = {
    TableName: TODOS_TABLE,
    Key: marshall({
      itemId: req.params.id,
    }),
  };

  try {
    const getParams = {
      TableName: TODOS_TABLE,
      Key: marshall({
        itemId: req.params.id,
      }),
    };
    const getResult = await dynamoDb.send(new GetItemCommand(getParams));
    if (!getResult.Item) {
      res.status(404).json({ error: "Item not found" });
    }

    await dynamoDb.send(new DeleteItemCommand(params));
    res.sendStatus(202);
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get item" });
    }
  }
});

// Get Todos endpoint
apiRouter.get("/todos", async function (req, res) {
  const params = {
    TableName: TODOS_TABLE,
  };

  try {
    const result = await dynamoDb.send(new ScanCommand(params));
    res.json(result.Items.map((item) => unmarshall(item)));
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get items" });
    }
  }
});

// Create Todo endpoint
apiRouter.post("/todos", async function (req, res) {
  const { name, duedate } = req.body;

  if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const newId = uuidv4();
  const params = {
    TableName: TODOS_TABLE,
    Item: marshall({
      itemId: newId,
      name,
      duedate,
      completed: false,
      created: new Date().getTime(),
    }),
  };

  try {
    const a = await dynamoDb.send(new PutItemCommand(params));
    res.json({ itemId: newId, name });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create item" });
    }
  }
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/api", apiRouter);

export const handler = serverless(app);
