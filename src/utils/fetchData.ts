interface FetchData {
    method: 'GET' | 'POST' | 'PUT';
    request: string;
    body?: any;
    headers?: { [key: string]: string };
}

const fetchData = async ({
    method,
    body,
    request,
    headers = { 'Content-type': 'application/json; charset=UTF-8' },
}: FetchData) => {
    type RequestObj = {
        method: 'GET' | 'POST' | 'PUT';
        headers: { [key: string]: string };
        body?: any;
    };

    const requestObj: RequestObj = {
        method,
        headers,
    };
    if (body) {
        requestObj.body = JSON.stringify(body);
    }

    const response = await fetch(request, { ...requestObj });
    return response;
};

export default fetchData;
