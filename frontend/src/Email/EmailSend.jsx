import { useEffect } from "react";
import Cookies from "js-cookie";
export const EmailSend = () => {
  const getParams = () => {
    // Parse query string to see if page request is coming from OAuth 2.0 server.
    const fragmentString = location.hash.substring(1);
    const params = {};
    let regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  };

  // store the params coming from google OAuth2 server
  let params = getParams();
  useEffect(() => {
    Cookies.set("google_params", JSON.stringify(params), {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });
    window.close();
 })
    
  return (<>SendEmail</>);
};
