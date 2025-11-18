// src/pages/ProfilePage.jsx
import { Mail, Phone, MapPin, Calendar, Instagram, Github, Linkedin, User, Database, HardDrive, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCacheInfo, clearCache, formatBytes } from '../utils/cacheInfo';

export default function ProfilePage() {
  const [cacheInfo, setCacheInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Sample user data - in a real app, this would come from state/API
  const userData = {
    name: "Budi Santoso",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=faces",
    email: "budi.santoso@email.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    joinDate: "Januari 2024",
    bio: "Pecinta kuliner Nusantara dan penggemar masakan tradisional. Senang berbagi resep dan tips memasak dengan komunitas.",
    stats: {
      recipes: 12,
      favorites: 48,
      followers: 234
    },
    social: {
      instagram: "@budisantoso",
      github: "budisantoso",
      linkedin: "budi-santoso"
    }
  };

  // Load cache information on component mount
  useEffect(() => {
    loadCacheInfo();
  }, []);

  const loadCacheInfo = async () => {
    setIsLoading(true);
    const info = await getCacheInfo();
    setCacheInfo(info);
    setIsLoading(false);
  };

  const handleClearCache = async (cacheName) => {
    const success = await clearCache(cacheName);
    if (success) {
      await loadCacheInfo();
      alert(`Cache "${cacheName}" berhasil dihapus!`);
    } else {
      alert('Gagal menghapus cache.');
    }
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
              </div>
            </div>

            {/* Name and Bio */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                {userData.name}
              </h2>
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

        {/* Cache Information Section */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 p-4 md:p-8 mt-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <Database className="w-5 h-5 md:w-6 md:h-6" />
            <span>Informasi Cache</span>
          </h3>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-slate-600">Memuat informasi cache...</p>
            </div>
          ) : cacheInfo.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">Belum ada data cache tersimpan.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cacheInfo.map((cache) => (
                <div 
                  key={cache.name}
                  className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <HardDrive className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        <h4 className="font-semibold text-slate-800 text-sm md:text-base">
                          {cache.name}
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                        <div>
                          <p className="text-slate-500">Jumlah Item:</p>
                          <p className="font-semibold text-slate-800">{cache.entries} item</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Ukuran Cache:</p>
                          <p className="font-semibold text-slate-800">{cache.sizeFormatted}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleClearCache(cache.name)}
                      className="ml-4 p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors duration-200"
                      title="Hapus cache"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Total cache size */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-xl p-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Cache Tersimpan</p>
                    <p className="text-xl md:text-2xl font-bold text-blue-600">
                      {formatBytes(cacheInfo.reduce((acc, cache) => acc + cache.size, 0))}
                    </p>
                  </div>
                  <Database className="w-10 h-10 md:w-12 md:h-12 text-blue-600 opacity-20" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}