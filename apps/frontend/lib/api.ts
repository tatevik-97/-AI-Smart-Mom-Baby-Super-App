const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

function clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}

async function tryRefresh(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) return false;

        const data = (await res.json()) as { accessToken: string };
        localStorage.setItem('token', data.accessToken);
        return true;
    } catch {
        return false;
    }
}

export const api = async (
    url: string,
    method = 'GET',
    body?: unknown,
    isRetry = false,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
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
        if (!isRetry && url !== '/auth/refresh') {
            const refreshed = await tryRefresh();
            if (refreshed) return api(url, method, body, true);
        }
        clearSession();
        throw new ApiError(401, 'Unauthorized');
    }

    if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { message?: string };
        throw new ApiError(res.status, data?.message ?? 'Something went wrong');
    }

    if (res.status === 204) return null;

    return res.json();
};