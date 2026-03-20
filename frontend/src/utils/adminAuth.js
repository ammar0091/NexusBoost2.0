const TOKEN_KEY = "nb_admin_token";

function parseJwt(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAdminLoggedIn() {
  const token = getAdminToken();
  const payload = parseJwt(token);

  if (!token || !payload?.exp) {
    clearAdminToken();
    return false;
  }

  const isExpired = payload.exp * 1000 <= Date.now();
  if (isExpired) {
    clearAdminToken();
    return false;
  }

  return true;
}
