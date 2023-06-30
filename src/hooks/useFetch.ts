import { useState, useEffect } from 'react';

function useFetch(apiQuery: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorFetch, setErrorFetch] = useState<unknown | null>(null);

    const globalApiURL = 'https://cozy-home.onrender.com/api/v1/';
    const url = globalApiURL + apiQuery;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const result = await response.json();

                if (!response.ok) throw new Error('something went wrong');

                setData(result);
                setErrorFetch(null);
                setLoading(false);
            } catch (error) {
                setErrorFetch(error);
                setLoading(false);
            }
        }
        if (errorFetch === null) fetchData();
    }, [errorFetch, url]);

    return { data, loading, errorFetch };
}

export default useFetch;
