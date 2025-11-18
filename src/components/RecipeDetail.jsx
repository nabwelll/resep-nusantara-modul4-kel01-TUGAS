// src/components/RecipeDetail.jsx
import { X, Clock, ChefHat, Star, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RecipeDetail({ recipe, onClose, type = 'makanan' }) {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!recipe) return null;

  // Handle share link
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/${type}/${recipe.id}`;
    
    try {
      if (navigator.share) {
        // Use native share API if available
        await navigator.share({
          title: recipe.name,
          text: `Lihat resep ${recipe.name} di Resep Nusantara`,
          url: shareUrl,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      }
    } catch (error) {
      // Silently fail or fallback to clipboard
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setShowCopiedMessage(true);
          setTimeout(() => setShowCopiedMessage(false), 2000);
        } catch (clipboardError) {
          console.error('Failed to copy link:', clipboardError);
        }
      }
    }
  };

  const colors = {
    makanan: {
      tag: 'text-blue-700 bg-blue-100',
      accent: 'bg-blue-500',
      numberBg: 'bg-blue-100 text-blue-600',
      circleBg: 'bg-blue-500'
    },
    minuman: {
      tag: 'text-green-700 bg-green-100',
      accent: 'bg-green-500',
      numberBg: 'bg-green-100 text-green-600',
      circleBg: 'bg-green-500'
    }
  };

  const colorScheme = colors[type];
  const rating = type === 'makanan' ? '4.8' : '4.7';
  const label = type === 'makanan' ? 'Makanan' : 'Minuman';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Share"
          >
            <Share2 className="w-6 h-6 text-slate-700" />
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Copied Message Toast */}
        {showCopiedMessage && (
          <div className="absolute top-20 right-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slideUp">
            Link berhasil disalin!
          </div>
        )}

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${colorScheme.tag}`}>
                  {label}
                </span>
                <div className="flex items-center space-x-1 bg-white/90 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-slate-700">
                    {rating}
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {recipe.name}
              </h2>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">{recipe.ingredients.length} bahan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChefHat className="w-5 h-5" />
                  <span className="text-sm font-medium">{recipe.steps.length} langkah</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Ingredients Section */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <div className={`w-1 h-8 rounded-full mr-3 ${colorScheme.accent}`}></div>
                Bahan-Bahan
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                  >
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold ${colorScheme.numberBg}`}>
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps Section */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <div className={`w-1 h-8 rounded-full mr-3 ${colorScheme.accent}`}></div>
                Langkah-Langkah
              </h3>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold ${colorScheme.circleBg}`}>
                      {index + 1}
                    </span>
                    <span className="text-slate-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
