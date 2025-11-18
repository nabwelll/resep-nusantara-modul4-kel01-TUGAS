// src/utils/profile.js
const PROFILE_KEY = 'resep-nusantara-profile';

// Default profile data
const DEFAULT_PROFILE = {
  username: "Budi Santoso",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces",
  email: "budi.santoso@email.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
  joinDate: "Januari 2024",
  bio: "Pecinta kuliner Nusantara dan penggemar masakan tradisional. Senang berbagi resep dan tips memasak dengan komunitas.",
  social: {
    instagram: "@budisantoso",
    github: "budisantoso",
    linkedin: "budi-santoso"
  }
};

/**
 * Get user profile from localStorage
 * @returns {Object} User profile object
 */
export const getProfile = () => {
  try {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : DEFAULT_PROFILE;
  } catch (error) {
    console.error('Error getting profile:', error);
    return DEFAULT_PROFILE;
  }
};

/**
 * Update username
 * @param {string} username - New username
 * @returns {Object} Updated profile
 */
export const updateUsername = (username) => {
  try {
    const profile = getProfile();
    const updatedProfile = { ...profile, username };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error('Error updating username:', error);
    return getProfile();
  }
};

/**
 * Update avatar
 * @param {string} avatar - New avatar URL or base64 data
 * @returns {Object} Updated profile
 */
export const updateAvatar = (avatar) => {
  try {
    const profile = getProfile();
    const updatedProfile = { ...profile, avatar };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error('Error updating avatar:', error);
    return getProfile();
  }
};

/**
 * Update entire profile
 * @param {Object} updates - Object with profile fields to update
 * @returns {Object} Updated profile
 */
export const updateProfile = (updates) => {
  try {
    const profile = getProfile();
    const updatedProfile = { ...profile, ...updates };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    return getProfile();
  }
};

/**
 * Convert image file to base64
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 encoded image
 */
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
