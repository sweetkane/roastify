export async function get(url, headers) {
    const result = await fetch(url, {
        method: 'GET',
        headers: headers
    });

    if (!result.ok) {
        throw new Error(`${result.statusText}`);
    }

    try {
        return await result.json();
    } catch (error) {
        throw new Error(`Error parsing JSON: ${error.message}`);
    }
}

export async function post(url, headers, body) {
    const result = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!result.ok) {
        throw new Error(`${result.statusText}`);
    }

    try {
        return await result.json();
    } catch (error) {
        throw new Error(`Error parsing JSON: ${error.message}`);
    }
}

export async function put(url, headers, body) {
    const result = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    });

    if (!result.ok) {
        throw new Error(`${result.statusText}`);
    }

    return true;
}