'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Map,
  Calendar,
  Users,
  DollarSign,
  Heart,
  Sun,
  Umbrella,
  Gift,
  Star,
  RefreshCw,
} from 'lucide-react';
import Image from 'next/image';

type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  ageRange: string;
  price: number;
  priceCategory: 'gratuit' | 'abordable' | 'modéré' | 'coûteux';
  mood: 'romantique' | 'détente' | 'aventureux' | 'culturel' | 'gastronomique';
  weather: 'intérieur' | 'extérieur' | 'les_deux';
  imageUrl: string;
  date?: string;
};

type Filters = {
  search: string;
  ageRange: string[];
  location: string;
  priceCategory: string[];
  mood: string[];
  weather: string[];
};

const AGE_RANGES = ['18+']; // Simplifié pour les couples
const PRICE_CATEGORIES = ['gratuit', 'abordable', 'modéré', 'coûteux'];
const MOODS = ['romantique', 'détente', 'aventureux', 'culturel', 'gastronomique'];
const WEATHER_OPTIONS = ['intérieur', 'extérieur', 'les_deux'];
const LOCATIONS = [
  'Tunis',
  'Hammamet',
  'Sousse',
  'Monastir',
  'Djerba',
  'Bizerte',
  'Carthage',
  'Sfax',
  'Tabarka',
  'Tozeur',
  'Sidi Bou Saïd',
];

interface ActivitesCoupleProps {
  activities: Activity[];
}

export default function ActivitesCouple({ activities }: ActivitesCoupleProps) {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    ageRange: [],
    location: '',
    priceCategory: [],
    mood: [],
    weather: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = activities;

    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower),
      );
    }

    // Filtre par tranche d'âge (simplifié pour les couples)
    if (filters.ageRange.length > 0) {
      results = results.filter((activity) => filters.ageRange.includes(activity.ageRange));
    }

    // Filtre par localisation
    if (filters.location) {
      results = results.filter((activity) => activity.location.toLowerCase() === filters.location.toLowerCase());
    }

    // Filtre par catégorie de prix
    if (filters.priceCategory.length > 0) {
      results = results.filter((activity) => filters.priceCategory.includes(activity.priceCategory));
    }

    // Filtre par ambiance
    if (filters.mood.length > 0) {
      results = results.filter((activity) => filters.mood.includes(activity.mood));
    }

    // Filtre par météo
    if (filters.weather.length > 0) {
      results = results.filter(
        (activity) => filters.weather.includes(activity.weather) || filters.weather.includes('les_deux'),
      );
    }

    setFilteredActivities(results);
  }, [filters, activities]);

  // Gérer la mise à jour des filtres
  const handleFilterChange = (filterType: keyof Filters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Gérer les filtres de type tableau (checkbox)
  const handleArrayFilterToggle = (filterType: 'ageRange' | 'priceCategory' | 'mood' | 'weather', value: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      if (Array.isArray(currentValues)) {
        return {
          ...prev,
          [filterType]: currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        };
      }
      return prev;
    });
  };

  // Gérer l'ajout/retrait des favoris
  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) => {
      if (prev.includes(activityId)) {
        return prev.filter((id) => id !== activityId);
      } else {
        return [...prev, activityId];
      }
    });

    // Sauvegarde dans le localStorage
    const updatedFavorites = favorites.includes(activityId)
      ? favorites.filter((id) => id !== activityId)
      : [...favorites, activityId];

    localStorage.setItem('coupleActivitiesFavorites', JSON.stringify(updatedFavorites));
  };

  // Charger les favoris depuis le localStorage au chargement
  useEffect(() => {
    const savedFavorites = localStorage.getItem('coupleActivitiesFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error);
      }
    }
  }, []);

  // Fonction pour filtrer uniquement les favoris
  const showOnlyFavorites = () => {
    if (favorites.length > 0) {
      setFilteredActivities(activities.filter((activity) => favorites.includes(activity.id)));
    }
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      search: '',
      ageRange: [],
      location: '',
      priceCategory: [],
      mood: [],
      weather: [],
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-red-700">Activités en Couple en Tunisie</h1>
          <p className="text-gray-600">
            Découvrez des expériences romantiques, des escapades et des moments inoubliables à partager en couple
            partout en Tunisie.
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une activité..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
              onClick={resetFilters}>
              <RefreshCw className="h-5 w-5" />
              <span>Réinitialiser</span>
            </button>
            <button
              className={`flex items-center justify-center gap-2 ${favorites.length > 0 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md px-4 py-2 transition-colors hover:bg-red-600`}
              onClick={showOnlyFavorites}
              disabled={favorites.length === 0}>
              <Heart className="h-5 w-5" fill={favorites.length > 0 ? 'currentColor' : 'none'} />
              <span>Favoris ({favorites.length})</span>
            </button>
          </div>

          {/* Panneau de filtres dépliable */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-6 border-t border-gray-200 pt-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Filtre par âge - simplifié pour les couples */}
              <div>
                <h3 className="font-medium text-gray-800">Public</h3>
                <div className="space-y-2">
                  {AGE_RANGES.map((ageRange) => (
                    <label key={ageRange} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.ageRange.includes(ageRange)}
                        onChange={() => handleArrayFilterToggle('ageRange', ageRange)}
                        className="form-checkbox h-5 w-5 text-red-600"
                      />
                      <span className="ml-2 text-sm">Adultes ({ageRange})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtre par catégorie de prix */}
              <div>
                <h3 className="font-medium text-gray-800">Catégorie de prix</h3>
                <div className="space-y-2">
                  {PRICE_CATEGORIES.map((priceCategory) => (
                    <label key={priceCategory} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.priceCategory.includes(priceCategory)}
                        onChange={() => handleArrayFilterToggle('priceCategory', priceCategory)}
                        className="form-checkbox h-5 w-5 text-red-600"
                      />
                      <span className="ml-2 text-sm">{priceCategory}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtre par ambiance */}
              <div>
                <h3 className="font-medium text-gray-800">Ambiance</h3>
                <div className="space-y-2">
                  {MOODS.map((mood) => (
                    <label key={mood} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.mood.includes(mood)}
                        onChange={() => handleArrayFilterToggle('mood', mood)}
                        className="form-checkbox h-5 w-5 text-red-600"
                      />
                      <span className="ml-2 text-sm">{mood}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtre par météo */}
              <div>
                <h3 className="font-medium text-gray-800">Type de météo</h3>
                <div className="space-y-2">
                  {WEATHER_OPTIONS.map((weather) => (
                    <label key={weather} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.weather.includes(weather)}
                        onChange={() => handleArrayFilterToggle('weather', weather)}
                        className="form-checkbox h-5 w-5 text-red-600"
                      />
                      <span className="ml-2 text-sm">{weather}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Liste des activités filtrées */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="overflow-hidden rounded-lg bg-white shadow-md">
                <img src={activity.imageUrl} alt={activity.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{activity.title}</h2>
                  <p className="mb-2 text-sm text-gray-600">{activity.description}</p>
                  <div className="mb-2 text-xs text-gray-500">
                    <span>{activity.location}</span> | <span>{activity.mood}</span> |{' '}
                    <span>{activity.priceCategory}</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(activity.id)}
                    className="flex items-center text-sm text-red-500 hover:text-red-600">
                    <Heart className="mr-1 h-4 w-4" fill={favorites.includes(activity.id) ? 'currentColor' : 'none'} />
                    {favorites.includes(activity.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Aucune activité trouvée pour les filtres sélectionnés.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
