import * as axios from 'axios';

export class WhaleAlertClient {
    async getPricesSince(sinceSecondsAgo?: number) {
        const apiKey = process.env.WHALE_ALERT_IO_API_KEY;
        const now = Math.floor(new Date().getTime() / 1000) - sinceSecondsAgo; // Epoch now - seconds
        const minAmountForFreePlan = 500000; // API supports only 500K for minimum plan
        const url = `https://api.whale-alert.io/v1/transactions?api_key=${apiKey}&&min_value=${minAmountForFreePlan}&start=${now}`;
        const response = await axios.default.get(url);
        return response.data;
    }
}