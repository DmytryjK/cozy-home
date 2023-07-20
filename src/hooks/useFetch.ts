import { useState, useEffect } from 'react';
import { Loading } from '../types/types';
import API_BASE from '../utils/API_BASE';

function useFetch(apiQuery: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<Loading>('idle');
    const [error, setError] = useState<unknown | null>(null);

    const url = `${API_BASE()}${apiQuery}`;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                setLoading('pending');
                const result = await response.json();

                if (!response.ok) throw new Error('something went wrong');

                setData(result);
                setError(null);
                setLoading('succeeded');
            } catch (errors) {
                setError(errors);
                setLoading('failed');
            }
        }
        if (error === null) fetchData();
    }, [error, url]);

    return { data, loading, error };
}

export default useFetch;
