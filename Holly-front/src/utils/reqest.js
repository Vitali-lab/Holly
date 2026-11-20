

export const reqest = (url, method, body) => {
    return fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) || null,
    }).then((res) => res.json());
}