import { WAIFU_URL } from "@/utils/constants";

export default async function fetchWaifu() {
  try {
    const response = await fetch(`${WAIFU_URL}/images/random`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching waifu data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data); // Optional: Log the data if needed
    return data; // Return the actual data fetched from the API
  } catch (error) {
    console.error('Error fetching waifu data:', error);
    throw error; // Re-throw the error to handle it in the calling code if necessary
  }
}
