import 'source-map-support/register';
import { WhaleAlertClient } from './../clients/whale-alert-client';
import { DynamoCache } from '../cache/dynamo-cache';

export const cache = async () => {
    const sinceSecondsAgo = 60; // smallest increment is 1 minute
    const client = new WhaleAlertClient();
    const cache = new DynamoCache();
    try {
        const data = await client.getPricesSince(Number(sinceSecondsAgo));
        const transactions = data.transactions;
        if (transactions) {
            const promises = transactions.map(element => {
                cache.save(element.id, element);
            });
            await Promise.all(promises);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
