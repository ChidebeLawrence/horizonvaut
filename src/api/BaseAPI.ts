import {getDeviceHash, getDeviceInfo} from '@/utils/device_utils';
import {logError} from '@/utils/helper';
import axios, {AxiosInstance, AxiosResponse} from 'axios';

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

const baseURL = 'https://api.horizonvaut.com';

export class BaseAPI {
    public axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({baseURL});

        this.axiosInstance.interceptors.request.use(
            async config => {


                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                config.headers.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

                return config;
            },
            error => Promise.reject(error),
        );

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            this.handleErrorResponse.bind(this),
        );
    }

    public async handleErrorResponse(error: any): Promise<any> {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userDetails');
            localStorage.removeItem('tokenExpiration');
            // window.location.href = '/signin';
            return this.axiosInstance(originalRequest);
        }
        return Promise.reject(
            this.formatErrorMessage(error?.response?.data?.message ?? error?.message),
        );
    }


    public formatErrorMessage(error: any): Error {
        return error;
    }

}

export default BaseAPI;