// src/pages/MakananPage.jsx
import { useState, useMemo } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';
import SearchBar from '../components/shared/SearchBar';

export default function MakananPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);

  const filteredRecipes = useMemo(() => {
    if (searchQuery.trim() === '') {
      return allMakanan;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allMakanan.filter(recipe => 
      recipe.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allMakanan]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari resep makanan..."
        />
        <RecipeGrid recipes={filteredRecipes} />
      </main>
    </div>
  );
}