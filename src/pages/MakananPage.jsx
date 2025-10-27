// src/pages/MakananPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage() {
  const [searchQuery] = useState('');
  
  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);
  const [filteredRecipes, setFilteredRecipes] = useState(allMakanan);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(allMakanan);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = allMakanan.filter(recipe => 
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, allMakanan]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        <RecipeGrid recipes={filteredRecipes} />
      </main>
    </div>
  );
}