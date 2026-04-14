const API_URL = 'http://localhost:3001';
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// production-ում → Railway URL

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export const api = async (url: string, method = 'GET', body?: unknown) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new ApiError(401, 'Unauthorized');
    }

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new ApiError(res.status, data?.message ?? 'Something went wrong');
    }

    // 204 No Content
    if (res.status === 204) return null;

    return res.json();
};
