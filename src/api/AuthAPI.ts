import BaseAPI from './BaseAPI';

export class AuthApi extends BaseAPI {

    public async Signup(
        username: string,
        password: string,
        email: string,
    ): Promise<{ message: string }> {
        try {
            const response = await this.axiosInstance.post('/auth/sign-up', {
                username,
                password,
                email,
            });

            return {message: response};
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

    public async SignIn(
        password: string,
        email: string,
    ): Promise<object> {
        try {
            const response = await this.axiosInstance.post('/auth/login', {
                password,
                email,
            });

            return response?.data;
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

    public async ResendOTP(email: string
    ): Promise<{ message: string }> {
        try {
            const response = await this.axiosInstance.post('/auth/resent-otp', {
                email,
            });
            return {message: response};
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

    public async VerifyOTP(email: string, code: string): Promise<object> {
        try {
            const response = await this.axiosInstance.post('/auth/verify-email', {
                email,
                code
            });
            return response?.data
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

    public async AccountSetup(): Promise<{ response: object }> {
        try {
            const response = await this.axiosInstance.get('/auth/account-setup');
            return {response};
        } catch (error) {
            throw this.formatErrorMessage(error);
        }
    }

}