
import axios from 'axios';
import Cookies from 'js-cookie';
export const instance = axios.create();

/**
 * Catch the AunAuthorized Request
 */
instance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("google_params");

    window.location = '/auth/login';
  }
});

export default instance;