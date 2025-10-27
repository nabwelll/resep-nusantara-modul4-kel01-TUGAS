// src/pages/MinumanPage.jsx
import { useState, useMemo } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';
import SearchBar from '../components/shared/SearchBar';
import RecipeDetail from '../components/RecipeDetail';
import Pagination from '../components/Pagination'; // ✅ Import Pagination

const ITEMS_PER_PAGE = 6; // ✅ Jumlah resep per halaman

export default function MinumanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // ✅ State untuk halaman saat ini
  
  const allMinuman = useMemo(() => Object.values(ResepMinuman.resep), []);

  // Filter recipes berdasarkan search query
  const filteredRecipes = useMemo(() => {
    if (searchQuery.trim() === '') {
      return allMinuman;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allMinuman.filter(recipe => 
      recipe.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, allMinuman]);

  // ✅ Hitung total halaman
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);

  // ✅ Ambil recipes untuk halaman saat ini
  const currentRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, currentPage]);

  // ✅ Reset ke halaman 1 saat search query berubah
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // ✅ Handler untuk pindah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <SearchBar 
          value={searchQuery}
          onChange={handleSearchChange} // ✅ Gunakan handler baru
          placeholder="Cari resep minuman..."
        />
        
        {/* ✅ Tampilkan info jumlah resep */}
        <div className="text-center mb-6">
          <p className="text-slate-600">
            Menampilkan {currentRecipes.length} dari {filteredRecipes.length} resep minuman
          </p>
        </div>

        <RecipeGrid 
          recipes={currentRecipes} // ✅ Gunakan currentRecipes bukan filteredRecipes
          onRecipeClick={handleRecipeClick}
        />

        {/* ✅ Tampilkan Pagination jika ada lebih dari 1 halaman */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onClose={handleCloseDetail}
          type="minuman"
        />
      )}
    </div>
  );
}
