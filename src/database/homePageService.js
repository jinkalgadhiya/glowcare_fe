import dbPromise from "./db";

const HOME_PAGE_SETTINGS_ID = "home-page-settings";

// Get saved homepage settings
export const getHomePageSettings = async () => {
  const db = await dbPromise;

  return await db.get("homePage", HOME_PAGE_SETTINGS_ID);
};

// Save all homepage settings
export const saveHomePageSettings = async (settings) => {
  const db = await dbPromise;

  await db.put("homePage", {
    ...settings,
    id: HOME_PAGE_SETTINGS_ID,
    updatedAt: new Date().toISOString(),
  });
};

// Delete saved homepage settings and use default settings again
export const resetHomePageSettings = async () => {
  const db = await dbPromise;

  await db.delete("homePage", HOME_PAGE_SETTINGS_ID);
};