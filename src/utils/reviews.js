// src/utils/reviews.js
const REVIEWS_KEY = 'resep-nusantara-reviews';

/**
 * Get all reviews from localStorage
 * @returns {Object} Object with recipe keys containing arrays of reviews
 */
export const getAllReviews = () => {
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : {};
  } catch (error) {
    console.error('Error getting reviews:', error);
    return {};
  }
};

/**
 * Get reviews for a specific recipe
 * @param {number} recipeId - ID of the recipe
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @returns {Array} Array of review objects for the recipe
 */
export const getRecipeReviews = (recipeId, type) => {
  try {
    const allReviews = getAllReviews();
    const key = `${type}_${recipeId}`;
    return allReviews[key] || [];
  } catch (error) {
    console.error('Error getting recipe reviews:', error);
    return [];
  }
};

/**
 * Add a review to a recipe
 * @param {number} recipeId - ID of the recipe
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @param {Object} review - Review object {userName, rating, comment, timestamp}
 * @returns {Array} Updated reviews array for the recipe
 */
export const addReview = (recipeId, type, review) => {
  try {
    const allReviews = getAllReviews();
    const key = `${type}_${recipeId}`;
    
    const recipeReviews = allReviews[key] || [];
    const newReview = {
      id: Date.now(),
      userName: review.userName || 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      timestamp: review.timestamp || new Date().toISOString()
    };
    
    const updatedRecipeReviews = [...recipeReviews, newReview];
    allReviews[key] = updatedRecipeReviews;
    
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
    return updatedRecipeReviews;
  } catch (error) {
    console.error('Error adding review:', error);
    return getRecipeReviews(recipeId, type);
  }
};

/**
 * Calculate average rating for a recipe
 * @param {number} recipeId - ID of the recipe
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @returns {number} Average rating (0 if no reviews)
 */
export const getAverageRating = (recipeId, type) => {
  try {
    const reviews = getRecipeReviews(recipeId, type);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return 0;
  }
};

/**
 * Get review count for a recipe
 * @param {number} recipeId - ID of the recipe
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @returns {number} Number of reviews
 */
export const getReviewCount = (recipeId, type) => {
  try {
    const reviews = getRecipeReviews(recipeId, type);
    return reviews.length;
  } catch (error) {
    console.error('Error getting review count:', error);
    return 0;
  }
};
