// src/pages/MinumanPage.jsx
import { useState, useMemo } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';
import SearchBar from '../components/shared/SearchBar';

export default function MinumanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allMinuman = useMemo(() => Object.values(ResepMinuman.resep), []);

  const filteredRecipes = useMemo(() => {
    if (searchQuery.trim() === '') {
      return allMinuman;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allMinuman.filter(recipe => 
      recipe.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allMinuman]);

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari resep minuman..."
        />
        <RecipeGrid recipes={filteredRecipes} />
      </main>
    </div>
  );
}