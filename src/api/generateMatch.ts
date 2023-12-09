import baseURL from "./baseUrl";

const generateMatch = async (favoriteDogIds: string[]): Promise<string> => {
  const matchURL = new URL(`${baseURL}/dogs/match`);

  try {
    const response = await fetch(matchURL.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteDogIds),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to generate match. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.match) {
      return data.match;
    } else {
      console.error("Invalid match response:", data);
      return "undefined";
    }
  } catch (error) {
    console.error("Error generating match:", error);
    throw error;
  }
};

export default generateMatch;
