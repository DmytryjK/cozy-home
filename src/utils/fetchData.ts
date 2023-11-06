interface FetchData {
    method: 'GET' | 'POST' | 'PUT';
    request: string;
    body?: any;
    headers?: { [key: string]: string };
    signal?: AbortSignal | null | undefined;
}

const fetchData = async ({
    method,
    body,
    request,
    headers = { 'Content-type': 'application/json; charset=UTF-8' },
    signal,
}: FetchData) => {
    type RequestObj = {
        method: 'GET' | 'POST' | 'PUT';
        headers: { [key: string]: string };
        body?: any;
        signal?: AbortSignal | null | undefined;
    };

    const requestObj: RequestObj = {
        method,
        headers,
    };
    if (body) {
        requestObj.body = JSON.stringify(body);
    }
    if (signal) {
        requestObj.signal = signal;
    }

    const response = await fetch(request, { ...requestObj });
    return response;
};

export default fetchData;
