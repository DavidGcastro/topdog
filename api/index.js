require("dotenv").config(); // Load environment variables from .env file
const apiToken = process.env.odds_api_key; // Access the API token from the environment variable
const oddsFormat = "american";
const baseUrl = "https://api.the-odds-api.com";

// Helper function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getter = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the data so it can be used elsewhere
  } catch (error) {
    console.error("There was an error!", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

const getSports = async () => {
  const url = `${baseUrl}/v4/sports?apiKey=${apiToken}`;
  return await getter(url);
};

const getActiveSports = async () => {
  const sports = await getSports();
  const activeSportsKeys = sports
    .filter((sport) => sport.active)
    .map((activeSport) => activeSport.key);
  return activeSportsKeys;
};

const getOddsForSport = async (sport) => {
  const oddsUrl = `${baseUrl}/v4/sports/${sport}/odds?regions=us&oddsFormat=${oddsFormat}&apiKey=${apiToken}`;
};

const getOddsForActiveSports = async () => {
  const activeSportsKeys = await getActiveSports();
  const oddsResults = [];

  for (const sportKey of activeSportsKeys) {
    const oddsUrl = `${baseUrl}/v4/sports/${sportKey}/odds?regions=us&oddsFormat=${oddsFormat}&apiKey=${apiToken}`;
    const odds = await getter(oddsUrl);
    oddsResults.push(odds);

    await delay(0);
  }

  return oddsResults;
};

module.exports = {
  getActiveSports,
  getOddsForSport,
  getOddsForActiveSports,
};
