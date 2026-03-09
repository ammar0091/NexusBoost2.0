const NETWORK_ERROR_MESSAGE =
  "Failed to fetch API. Check backend URL, CORS and server status.";

function trimTrailingSlashes(value) {
  return value.replace(/\/+$/, "");
}

function resolveApiBaseUrl() {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase && String(envBase).trim()) {
    return trimTrailingSlashes(String(envBase).trim());
  }

  if (import.meta.env.DEV) {
    return "/api";
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:5000/api";
    }
    return `${window.location.origin}/api`;
  }

  return "/api";
}

const API_BASE_URL = resolveApiBaseUrl();
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS || 15000);

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("nb_admin_token");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const method = options.method || "GET";
  const requestUrl = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(requestUrl, {
      ...options,
      method,
      headers,
      signal: controller.signal,
    });

    let data = null;
    const rawText = await response.text();
    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { message: rawText };
      }
    }

    if (!response.ok) {
      const maybeMessage = data?.message;
      const isHtmlError = typeof maybeMessage === "string" && maybeMessage.includes("<!DOCTYPE");
      const errorMessage =
        !maybeMessage || isHtmlError
          ? `Request failed with status ${response.status}`
          : maybeMessage;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("API request timed out. Please try again.");
    }
    if (error instanceof TypeError) {
      throw new Error(NETWORK_ERROR_MESSAGE);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export { API_BASE_URL, apiRequest };
