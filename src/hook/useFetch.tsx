import {useState, useEffect} from 'react';

export const useFetch = <T, >(url: string): { data: T | null; loading: boolean; error: string | null } => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjJhNDYxZGFiZDU3ZDA2YzMwNGZiYWRlYjMwYzAzYSIsIm5iZiI6MTczMjI3MTE5MC40NDE5NTI1LCJzdWIiOiI2NzQwNWJkMDAxNWQyZTBmNzAyZGZlY2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eHaZXpRQ3Bfk_Leiu5HqErmGI2uTLdBMD_bNF3uC_Ck'
                    },
                });
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {data, loading, error};
};
