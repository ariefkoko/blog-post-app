import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("gorest_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to fetch posts
export const getPosts = async (page = 1, perPage = 2) => {
  const response = await api.get(`/posts`, {
    params: { page, per_page: perPage },
  });

  return response.data;
};

// Function to fetch posts detail
export const getPostDetail = async (id: string) => {
  const response = await api.get(`/posts/${id}`);

  return response.data;
};

// Function to fetch user information
export const getUserInformation = async (id: string) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

// Function to validate token
export const validateToken = async (token: string) => {
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Token validation failed");
    }

    return true;
  } catch (error: any) {
    console.error(
      "Token validation failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to add Post
export const addPost = async (userId: number, title: string, body: string) => {
  try {
    const response = await api.post(`/users/${userId}/posts`, { title, body });

    if (response.status !== 201) {
      throw new Error("Failed to add post!");
    }

    return true;
  } catch (error: any) {
    console.error(
      "Failed to add post!:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to Delete Post
export const deletePost = async (postId: string) => {
  try {
    const response = await api.delete(`/posts/${postId}`);

    if (response.status !== 204) {
      throw new Error("Failed to delete post!");
    }

    return true;
  } catch (error: any) {
    console.error(
      "Failed to delete post!:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to edit Post
export const editPost = async (postId: string, title: string, body: string) => {
  try {
    const response = await api.put(`/posts/${postId}`, { title, body });

    if (response.status !== 200) {
      throw new Error("Failed to edit post!");
    }

    return true;
  } catch (error: any) {
    console.error(
      "Failed to edit post!:",
      error.response?.data || error.message
    );
    throw error;
  }
};
