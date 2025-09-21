import AuthService from "../services/AuthService";

const apiRequest = async (url, options = {}) => {
  let token = localStorage.getItem("accessToken");

  const makeRequest = async (newToken) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${newToken}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    return response.json();
  };

  try {
    return await makeRequest(token);
  } catch (err) {
    if (err.message === "Unauthorized") {
        const newToken = await AuthService.refreshToken();
        return await makeRequest(newToken);
    } else {
      throw err;
    }
  }
};

export default apiRequest;
