const API_BASE = 'https://api.synchtravel.com';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function apiRequest(endpoint, method, data = {}) {
  const url = `${API_BASE}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };


  data.token = API_TOKEN;

  // Add body if method supports it
  if (["POST", "PUT", "PATCH"].includes(method)) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }

  return response.json();
}
