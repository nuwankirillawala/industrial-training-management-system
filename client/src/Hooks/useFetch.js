import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (method, url, initialData) => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (method === 'GET' || method === 'get') {
                    const response = await axios.get(url, { withCredentials: true });
                    setData(response.data);
                    console.log(response.data);
                }
                else if (method === 'POST' || method === 'post') {
                    const response = await axios.get(url, initialData, { withCredentials: true });
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return {data};
}

export default useFetch