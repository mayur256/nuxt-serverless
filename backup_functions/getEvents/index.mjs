import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "Events";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  try {
    if (event.params.path.id === "all") {
      body = await dynamo.send(
        new ScanCommand({ TableName: tableName })
      );
      body = body.Items;
    } else {
       body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              EventId: event.params.path.id,
            },
          })
        );
        body = body.Item
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  }

  return {
    statusCode,
    body,
    headers,
  };
};
