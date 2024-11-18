import BaseAPI from './BaseAPI';

export class CommonAPI extends BaseAPI {

    public async GetPaymentAddress( coin_id : number): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.get(`/investment/payment-wallet/${coin_id}`);
            return response?.data?.data
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

       public async GetCoins(): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.get(`/wallet/wallets`);
            return response?.data?.data
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }
}