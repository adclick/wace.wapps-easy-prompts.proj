import axios from 'axios';
import { Provider } from '../model/Provider';

const API_URL = import.meta.env.VITE_API_URL;

export const getProviders = async (technologyId: number): Promise<Provider[]> => {
    const { data } = await axios.get(`${API_URL}/providers?` + new URLSearchParams({
        technology_id: technologyId.toString()
    }));

    return data;
}