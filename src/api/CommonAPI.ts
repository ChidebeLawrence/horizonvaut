import BaseAPI from './BaseAPI';

export class CommonAPI extends BaseAPI {

    public async GetPaymentAddress(): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.get('/investment/payment-wallet');
            return response?.data?.data
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }
}