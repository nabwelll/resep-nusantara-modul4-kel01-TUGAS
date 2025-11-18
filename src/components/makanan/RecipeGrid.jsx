// src/components/makanan/RecipeGrid.jsx
import { Clock, Star, ChefHat, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { addFavorite, removeFavorite, isFavorite } from '../../utils/favorites';
import LazyImage from '../shared/LazyImage';

export default function RecipeGrid({ recipes, onRecipeClick }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [favorites, setFavorites] = useState({});
  const cardRefs = useRef([]);

  // Initialize favorites state
  useEffect(() => {
    const favState = {};
    recipes.forEach(recipe => {
      favState[recipe.id] = isFavorite(recipe.id, 'makanan');
    });
    setFavorites(favState);
  }, [recipes]);

  const handleFavoriteToggle = (recipe, event) => {
    event.stopPropagation();
    const recipeWithType = { ...recipe, type: 'makanan' };
    
    if (favorites[recipe.id]) {
      removeFavorite(recipe.id, 'makanan');
      setFavorites(prev => ({ ...prev, [recipe.id]: false }));
    } else {
      addFavorite(recipeWithType);
      setFavorites(prev => ({ ...prev, [recipe.id]: true }));
    }
  };

  useEffect(() => {
   
    cardRefs.current = cardRefs.current.slice(0, recipes.length);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
     
          setTimeout(() => {
            setVisibleCards(prev => new Set(prev).add(index));
          }, (index % 3) * 150); 
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [recipes]); 

  return (
    <section>
       <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
        Jelajahi Resep Makanan
      </h1>
      <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
        Temukan inspirasi masakan Nusantara favoritmu. Dari hidangan utama hingga camilan, semua ada di sini.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe.id} 
            ref={el => cardRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visibleCards.has(index) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            onClick={() => onRecipeClick(recipe)}
          >
            
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-32 md:h-56 overflow-hidden">
                <LazyImage 
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {/* Favorite button */}
                <button
                  onClick={(e) => handleFavoriteToggle(recipe, e)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label={favorites[recipe.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart 
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                      favorites[recipe.id] 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              <div className="relative z-10 p-4 md:p-8">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                    Makanan
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">4.8</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {recipe.name}
                </h3>
                <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {recipes.length === 0 && (
        <div className="text-center py-16">
            <p className="text-slate-500">Resep tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      )}
    </section>
  );
}

RecipeGrid.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onRecipeClick: PropTypes.func.isRequired,
};