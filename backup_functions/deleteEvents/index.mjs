import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "Events";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const EventId = event.params.path.id
    const command = new DeleteCommand({
            TableName: tableName,
            Key: {
              EventId,
            },
          })
    await dynamo.send(command);
    body = `Event: ${EventId} deleted`;
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
