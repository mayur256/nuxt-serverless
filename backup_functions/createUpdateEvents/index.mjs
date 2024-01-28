import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
  
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
    const requestJSON = event['body-json'];
    const command = new PutCommand({
      TableName: tableName,
      Item: {
        date: requestJSON.date,
        location: requestJSON.location,
        capacity: requestJSON.capacity,
        status: requestJSON.status,
        EventId: requestJSON.EventId,
        organizer: requestJSON.organizer,
        title: requestJSON.title,
        type: requestJSON.type
      },
    });
    
    await dynamo.send(command)
    body = "Event updated/created";
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
