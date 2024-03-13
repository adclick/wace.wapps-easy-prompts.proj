import { AxiosError } from "axios";

export const parseError = (error: any) => {
    return error instanceof AxiosError ? error.response?.data.message : error.message;
}