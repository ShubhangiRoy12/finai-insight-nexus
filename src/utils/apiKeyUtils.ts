
/**
 * Utility functions for managing API keys
 */

export const saveApiKey = (key: string, name: string): void => {
  localStorage.setItem(name, key);
};

export const getApiKey = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const clearApiKey = (name: string): void => {
  localStorage.removeItem(name);
};
