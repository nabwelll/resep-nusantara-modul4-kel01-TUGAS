// src/components/shared/LazyImage.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function LazyImage({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  placeholderClassName = '',
  onLoad,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      {/* Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse ${placeholderClassName}`}
          aria-hidden="true"
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      )}

      {/* Actual image with lazy loading */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  placeholderClassName: PropTypes.string,
  onLoad: PropTypes.func,
};
