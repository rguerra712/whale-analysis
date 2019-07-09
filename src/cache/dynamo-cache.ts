import { DynamoDB } from 'aws-sdk';

export class DynamoCache {
    async save(transactionId: number, data: any) {
        const item: any = { cachedAt: new Date().toISOString() };
        Object.assign(item, data);
        item.transactionId = transactionId;
        const dataToSave = {
            TableName: process.env.CACHE_DYNAMODB_TABLE,
            Item: item,
        };

        try {
            const dynamoDb = new DynamoDB.DocumentClient();
            await dynamoDb.put(dataToSave).promise();
            console.log(`Updated cache for transactionId ${transactionId}`);
        } catch (error) {
            const stringSize = Buffer.byteLength(JSON.stringify(data), 'utf8');
            console.error(`Error updating ${transactionId} - size: ${stringSize} - ${error.message}`);
        }
    }
}