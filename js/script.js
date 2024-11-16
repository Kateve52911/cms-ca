import { API_URL, API_KEY, API_SECRET } from "./constants.js";

export async function get2ndHandGameData(apiURL = API_URL) {
  const response = await fetch(apiURL, {
    headers: {
      Authorization: `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
    },
  });
  const data = await response.json();
  console.log(data);

  return data;
}
