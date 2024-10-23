export const delay = async (ms: number = 2000) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
