import { WhaleAlertClient } from './../clients/whale-alert-client';
import { APIGatewayProxyHandler, APIGatewayEvent } from 'aws-lambda';
import 'source-map-support/register';

export const get: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  let { sinceSecondsAgo } = event.queryStringParameters || { sinceSecondsAgo: 6 };
  if (!Number(sinceSecondsAgo)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'sinceSecondsAgo must be numeric',
      }, null, 2),
    };
  }
  const client = new WhaleAlertClient();
  try
  {
    const data = await client.getPricesSince(Number(sinceSecondsAgo));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: data,
      }, null, 2),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }, null, 2),
    };
  }
  
}
