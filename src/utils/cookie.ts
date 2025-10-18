// Simple cookie utilities without external dependencies

// Function to get a cookie by name
export const getCookie = (cookieName: string): string | undefined => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return undefined;
};

// Function to set a cookie with a given name and value
export const setCookie = (
  cookieName: string,
  cookieValue: string,
  days: number = 7
): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

// Function to remove a cookie by name
export const removeCookie = (cookieName: string): void => {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

