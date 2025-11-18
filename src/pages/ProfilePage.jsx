// src/pages/ProfilePage.jsx
import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Calendar, Instagram, Github, Linkedin, User, Camera, Edit2, Check, X, Clock, Star, ChefHat, Heart } from 'lucide-react';
import { getProfile, updateUsername, updateAvatar, imageToBase64 } from '../utils/profile';
import { getFavorites, removeFavorite } from '../utils/favorites';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load profile data
    const profileData = getProfile();
    setProfile(profileData);
    setTempUsername(profileData.username);
    
    // Load favorites
    const favs = getFavorites();
    setFavorites(favs);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await imageToBase64(file);
        const updatedProfile = updateAvatar(base64);
        setProfile(updatedProfile);
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('Gagal mengunggah foto. Silakan coba lagi.');
      }
    }
  };

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSave = () => {
    if (tempUsername.trim()) {
      const updatedProfile = updateUsername(tempUsername.trim());
      setProfile(updatedProfile);
      setIsEditingUsername(false);
    }
  };

  const handleUsernameCancel = () => {
    setTempUsername(profile.username);
    setIsEditingUsername(false);
  };

  const handleRemoveFavorite = (recipe, event) => {
    event.stopPropagation();
    removeFavorite(recipe.id, recipe.type);
    setFavorites(getFavorites());
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const userData = {
    name: profile.username,
    photo: profile.avatar,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    joinDate: profile.joinDate,
    bio: profile.bio,
    stats: {
      recipes: 12,
      favorites: favorites.length,
      followers: 234
    },
    social: profile.social
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8">
          Profil Pengguna
        </h1>

        {/* Profile Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 overflow-hidden mb-6">
          {/* Cover Background */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
          </div>

          {/* Profile Info */}
          <div className="px-4 md:px-8 pb-6 md:pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 md:-mt-20 mb-4">
              <div className="relative inline-block">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 md:border-6 border-white shadow-xl overflow-hidden bg-white">
                  <img 
                    src={userData.photo}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-2 md:border-4 border-white" />
                
                {/* Avatar Edit Button */}
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Change avatar"
                  title="Ubah foto profil"
                >
                  <Camera className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name and Bio */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {isEditingUsername ? (
                  <>
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="text-2xl md:text-3xl font-bold text-slate-800 bg-white border-2 border-blue-400 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-600"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUsernameSave();
                        if (e.key === 'Escape') handleUsernameCancel();
                      }}
                    />
                    <button
                      onClick={handleUsernameSave}
                      className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      title="Simpan"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleUsernameCancel}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      title="Batal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {userData.name}
                    </h2>
                    <button
                      onClick={handleUsernameEdit}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-110"
                      title="Edit username"
                    >
                      <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                {userData.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-3 md:p-4 text-center border border-blue-200/50">
                <p className="text-xl md:text-3xl font-bold text-blue-600">{userData.stats.recipes}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Resep</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-3 md:p-4 text-center border border-pink-200/50">
                <p className="text-xl md:text-3xl font-bold text-pink-600">{userData.stats.favorites}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Favorit</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-3 md:p-4 text-center border border-purple-200/50">
                <p className="text-xl md:text-3xl font-bold text-purple-600">{userData.stats.followers}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Pengikut</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">
                Informasi Kontak
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Email */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Email</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Telepon</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Lokasi</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.location}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Bergabung</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <User className="w-5 h-5 md:w-6 md:h-6" />
            <span>Media Sosial</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Instagram */}
            <a 
              href={`https://instagram.com/${userData.social.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.instagram}</span>
            </a>

            {/* GitHub */}
            <a 
              href={`https://github.com/${userData.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.github}</span>
            </a>

            {/* LinkedIn */}
            <a 
              href={`https://linkedin.com/in/${userData.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.linkedin}</span>
            </a>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 p-4 md:p-8 mt-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-600" />
            <span>Resep Favorit Saya</span>
            <span className="ml-auto text-sm font-normal text-slate-500">
              {favorites.length} resep
            </span>
          </h3>

          {favorites.length === 0 ? (
            <div className="text-center py-12 bg-white/30 rounded-2xl border border-white/50">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-base mb-1">Belum ada resep favorit</p>
              <p className="text-slate-400 text-sm">Mulai tandai resep favorit Anda dari halaman Makanan atau Minuman</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((recipe) => (
                <div 
                  key={`${recipe.id}-${recipe.type}`}
                  className="group transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`relative bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl overflow-hidden shadow-lg ${
                    recipe.type === 'makanan' 
                      ? 'shadow-blue-500/10 hover:shadow-blue-500/20' 
                      : 'shadow-green-500/10 hover:shadow-green-500/20'
                  } transition-all duration-300`}>
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Favorite button */}
                      <button
                        onClick={(e) => handleRemoveFavorite(recipe, e)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                        aria-label="Remove from favorites"
                        title="Hapus dari favorit"
                      >
                        <Heart 
                          className="w-4 h-4 text-red-500 fill-red-500"
                        />
                      </button>

                      {/* Type badge */}
                      <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${
                        recipe.type === 'makanan'
                          ? 'text-blue-700 bg-blue-100/90'
                          : 'text-green-700 bg-green-100/90'
                      }`}>
                        {recipe.type === 'makanan' ? 'Makanan' : 'Minuman'}
                      </span>
                    </div>
                    
                    <div className="p-4">
                      <h4 className={`font-bold text-slate-800 mb-3 text-sm line-clamp-2 ${
                        recipe.type === 'makanan' ? 'group-hover:text-blue-600' : 'group-hover:text-green-600'
                      } transition-colors duration-200`}>
                        {recipe.name}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{recipe.ingredients?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                          <ChefHat className="w-3 h-3" />
                          <span className="font-medium">{recipe.steps?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="font-medium">{recipe.type === 'makanan' ? '4.8' : '4.7'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}