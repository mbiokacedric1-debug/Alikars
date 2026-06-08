/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car as CarIcon,
  Heart,
  Scale,
  Sparkles,
  TrendingUp,
  Info,
  Calendar,
  Gauge,
  Layers,
  SearchCheck,
  Zap,
} from "lucide-react";
import { CARS_DATA } from "./data/cars";
import { Car, FilterState } from "./types";
import CarCard from "./components/CarCard";
import CarFilters from "./components/CarFilters";
import CarDetailModal from "./components/CarDetailModal";
import CompareSection from "./components/CompareSection";

export default function App() {
  // --- Active Tab State ---
  // "all" | "favorites" | "compare"
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "compare">("all");

  // --- Favorites & Comparisons State ---
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [compareList, setCompareList] = useState<Car[]>([]);

  // --- Selected Car (Modal) ---
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // --- Unique Values for Filters (Computed once) ---
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(CARS_DATA.map((c) => c.marque))).sort();
  }, []);

  const uniqueColors = useMemo(() => {
    return Array.from(new Set(CARS_DATA.map((c) => c.couleur))).sort();
  }, []);

  const { maxPrice, maxKms } = useMemo(() => {
    return {
      maxPrice: Math.max(...CARS_DATA.map((c) => c.prixHT)),
      maxKms: Math.max(...CARS_DATA.map((c) => c.kms)),
    };
  }, []);

  // --- Filters State ---
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    marque: "",
    boite: "",
    maxPrix: maxPrice,
    maxKms: maxKms,
    minAnnee: 2023,
    collorFilter: "",
  });

  // --- Filtering Logic ---
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // 1. Text Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesSearch =
          car.modele.toLowerCase().includes(query) ||
          car.marque.toLowerCase().includes(query) ||
          car.motorisation.toLowerCase().includes(query) ||
          car.vin.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Marque
      if (filters.marque && car.marque !== filters.marque) {
        return false;
      }

      // 3. Transmission
      if (filters.boite && car.boite !== filters.boite) {
        return false;
      }

      // 4. Couleur
      if (filters.collorFilter && car.couleur !== filters.collorFilter) {
        return false;
      }

      // 5. Max Price HT
      if (car.prixHT > filters.maxPrix) {
        return false;
      }

      // 6. Max Kilometers
      if (car.kms > filters.maxKms) {
        return false;
      }

      // 7. Min Year
      if (car.annee < filters.minAnnee) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // --- Filtered items relative to current view ---
  const displayedCars = useMemo(() => {
    if (activeTab === "favorites") {
      return filteredCars.filter((car) => favorites.some((f) => f.vin === car.vin));
    }
    if (activeTab === "compare") {
      return filteredCars.filter((car) => compareList.some((c) => c.vin === car.vin));
    }
    return filteredCars;
  }, [filteredCars, activeTab, favorites, compareList]);

  // --- Stats / Metrics calculations ---
  const metrics = useMemo(() => {
    const list = filteredCars;
    if (list.length === 0) {
      return { avgPriceTTC: 0, newCount: 0, autoCount: 0, avgKms: 0 };
    }
    const totalPriceTTC = list.reduce((acc, car) => acc + car.prixHT * 1.2, 0);
    const avgPriceTTC = Math.round(totalPriceTTC / list.length);

    const newCount = list.filter((car) => car.annee >= 2026 || car.kms <= 50).length;
    const autoCount = list.filter((car) => car.boite === "Boite automatique").length;

    const totalKms = list.reduce((acc, car) => acc + car.kms, 0);
    const avgKms = Math.round(totalKms / list.length);

    return { avgPriceTTC, newCount, autoCount, avgKms };
  }, [filteredCars]);

  // --- Favorite toggle handler ---
  const handleToggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.vin === car.vin);
      if (exists) {
        return prev.filter((f) => f.vin !== car.vin);
      } else {
        return [...prev, car];
      }
    });
  };

  // --- Compare list toggle handler (Max 3) ---
  const handleToggleCompare = (car: Car) => {
    setCompareList((prev) => {
      const exists = prev.some((c) => c.vin === car.vin);
      if (exists) {
        return prev.filter((c) => c.vin !== car.vin);
      } else {
        if (prev.length >= 3) {
          // Keep max 3, remove first element
          return [...prev.slice(1), car];
        }
        return [...prev, car];
      }
    });
  };

  const clearCompareList = () => setCompareList([]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-brand-red selection:text-white pb-12" id="app-root-container">
      
      {/* Decorative Glow elements */}
      <div className="absolute top-0 left-1/4 h-[300px] w-[500px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-10 h-[400px] w-[400px] rounded-full bg-brand-red/5 blur-[150px] pointer-events-none" />

      {/* --- Top Navbar --- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-modern" id="navbar-header">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-brand-red text-white font-black italic text-lg leading-none">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                  MONO<span className="text-brand-red tracking-tight">CHROME</span>
                </span>
                <span className="bg-white/5 px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest text-[#dc2626] border border-white/10 leading-none">
                  Prestige
                </span>
              </div>
              <p className="text-[9px] text-zinc-550 font-mono tracking-widest uppercase mt-0.5 leading-none">
                L’EXCELLENCE DE L’OCCASION HAUTE-COUTURE
              </p>
            </div>
          </div>

          {/* Practical Live Indicators */}
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>PARC EN DIRECT</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-zinc-550 font-bold">MAJ: JUIN 2026</span>
          </div>
        </div>
      </header>

      {/* --- Main Contents Context --- */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 space-y-8 relative">
        
        {/* --- Hero Welcome banner --- */}
        <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#070707] p-8 sm:p-12 shadow-2xl" id="hero-banner">
          {/* Accent decoration absolute text */}
          <div className="absolute right-8 bottom-6 text-7xl sm:text-9xl font-black uppercase text-white/5 italic pointer-events-none tracking-tighter leading-none select-none">
            MONO
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-5 bg-[radial-gradient(#DC2626_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

          <div className="relative z-20 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-brand-red/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#dc2626] font-mono border border-brand-red/20">
              <Sparkles className="h-3.5 w-3.5" />
              Catalogue Privé & Spécifications Certifiées
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase italic leading-[0.95] tracking-tighter text-white">
              MONO<span className="text-brand-red">CHROME</span><br/>
              <span className="text-white/40">PRESTIGE GT</span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider leading-relaxed max-w-lg">
              Explorez nos véhicules de parcs rigoureusement inspectés, du baroudeur Dacia Duster 2026 aux crossovers urbains Renault Captur Alpine. Calculez vos financements ou comparez les fiches techniques en direct.
            </p>
          </div>
        </div>

        {/* --- Dynamic Analytics Grid (Top metrics cards) --- */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="analytics-section">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-none border border-white/10 bg-[#0a0a0a] p-5"
          >
            <div className="text-[9px] uppercase font-black text-zinc-500 tracking-widest font-mono">
              Modèles Disponibles
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white tracking-tighter">
                {filteredCars.length}
              </span>
              <span className="text-[9px] uppercase font-mono text-zinc-600 font-bold">
                sur {CARS_DATA.length}
              </span>
            </div>
            <span className="mt-2 block text-[9.5px] font-mono uppercase tracking-wider text-zinc-500">
              {filters.search || filters.marque ? "Recherche active" : "Status: Collection complète"}
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-none border border-white/10 bg-[#0a0a0a] p-5"
          >
            <div className="text-[9px] uppercase font-black text-zinc-500 tracking-widest font-mono">
              Budget Moyen TTC
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="text-3xl font-black font-mono text-brand-red tracking-tighter">
                {metrics.avgPriceTTC.toLocaleString()} €
              </span>
              <span className="text-[9px] font-black text-zinc-550 uppercase">TTC</span>
            </div>
            <span className="mt-2 block text-[9.5px] font-mono uppercase tracking-wider text-zinc-550 truncate">
              Soit env. {Math.round(metrics.avgPriceTTC / 1.2).toLocaleString()} € HT
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-none border border-white/10 bg-[#0a0a0a] p-5"
          >
            <div className="text-[9px] uppercase font-black text-zinc-500 tracking-widest font-mono">
              Catégorie Neufs / 2026
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white tracking-tighter">
                {metrics.newCount}
              </span>
              <span className="text-[9px] text-[#dc2626] font-black uppercase tracking-widest italic">
                Prestige
              </span>
            </div>
            <span className="mt-2 block text-[9.5px] font-mono uppercase tracking-wider text-zinc-500">
              Kms proches de zéro
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-none border border-white/10 bg-[#0a0a0a] p-5"
          >
            <div className="text-[9px] uppercase font-black text-zinc-500 tracking-widest font-mono">
              Distance Moyenne
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-3xl font-black font-mono text-white tracking-tighter">
                {metrics.avgKms.toLocaleString()}
              </span>
              <span className="text-[9px] font-mono uppercase text-zinc-600 font-bold">km</span>
            </div>
            <span className="mt-2 block text-[9.5px] font-mono uppercase tracking-wider text-zinc-500">
              BVA: {Math.round((metrics.autoCount / (filteredCars.length || 1)) * 100)}% du parc
            </span>
          </motion.div>
        </section>

        {/* --- Interactive filters section --- */}
        <section id="interactive-filters">
          <CarFilters
            filters={filters}
            setFilters={setFilters}
            uniqueBrands={uniqueBrands}
            uniqueColors={uniqueColors}
            maxPossiblePrice={maxPrice}
            maxPossibleKms={maxKms}
          />
        </section>

        {/* --- Tab Selector and Compare section integrations --- */}
        <div className="flex flex-col gap-6 pt-2">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
            {/* Styled tab items (All, Favorites, Compare) */}
            <div className="flex bg-[#0a0a0a] p-1 rounded-none border border-white/10">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex items-center gap-1.5 px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-none transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-brand-red text-white font-extrabold"
                    : "text-zinc-500 hover:text-white"
                }`}
                id="tab-all-cars"
              >
                <Layers className="h-4 w-4" />
                Tout le parc ({filteredCars.length})
              </button>

              <button
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center gap-1.5 px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-none transition-all cursor-pointer relative ${
                  activeTab === "favorites"
                    ? "bg-brand-red text-white font-extrabold"
                    : "text-zinc-500 hover:text-white"
                }`}
                id="tab-favorite-cars"
              >
                <Heart className="h-4 w-4" />
                Favoris
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-none bg-white text-[9px] font-black leading-none text-brand-red px-1 box-shadow">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("compare")}
                className={`flex items-center gap-1.5 px-5 py-3 text-[10px] font-black uppercase tracking-widest rounded-none transition-all cursor-pointer relative ${
                  activeTab === "compare"
                    ? "bg-brand-red text-white font-extrabold"
                    : "text-zinc-500 hover:text-white"
                }`}
                id="tab-compare-cars"
              >
                <Scale className="h-4 w-4" />
                Comparateur
                {compareList.length > 0 && (
                  <span className="absolute -top-1.5 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-none bg-[#dc2626] text-[9px] font-black leading-none text-white px-1 box-shadow">
                    {compareList.length}
                  </span>
                )}
              </button>
            </div>

            {/* List count display */}
            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <SearchCheck className="h-4 w-4 text-[#dc2626]" />
              <span>Affichage de <strong className="text-white">{displayedCars.length}</strong> véhicule{displayedCars.length > 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* --- Compare Section Matrix (Expandable Dock drawer) --- */}
          {compareList.length > 0 && (
            <section id="compare-section-matrix">
              <CompareSection
                compareList={compareList}
                onRemoveFromCompare={handleToggleCompare}
                onClearAll={clearCompareList}
              />
            </section>
          )}

          {/* --- Vehicles grid with custom animation stagger --- */}
          <section id="vehicles-grid" className="pt-2">
            <AnimatePresence mode="popLayout">
              {displayedCars.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-none border border-white/10 p-12 text-center bg-[#0a0a0a] min-h-[220px] flex flex-col justify-center items-center"
                  id="empty-results-box"
                >
                  <p className="font-display font-black text-white text-lg uppercase italic tracking-tighter">Aucun véhicule disponible</p>
                  <p className="text-[10px] text-zinc-500 mt-2 max-w-sm mx-auto font-mono uppercase tracking-wider">
                    Ajustez vos curseurs de budget ou réinitialisez vos critères de filtrage de recherche pour recharger la collection de prestige.
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedCars.map((car) => (
                    <CarCard
                      key={car.vin}
                      car={car}
                      onViewDetails={setSelectedCar}
                      isFavorite={favorites.some((f) => f.vin === car.vin)}
                      onToggleFavorite={handleToggleFavorite}
                      isComparing={compareList.some((c) => c.vin === car.vin)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </section>

        </div>

      </main>

      {/* --- Elegant Modal Sheet trigger for details --- */}
      <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />

      {/* --- Footer --- */}
      <footer className="mt-20 border-t border-zinc-900 bg-zinc-950 py-8 relative z-10" id="app-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-550 text-center font-mono">
          <div>
            <div className="font-display text-sm font-bold text-white tracking-widest uppercase">
              MONO<span className="text-brand-red">CHROME</span>
            </div>
            <p className="mt-1 text-zinc-600">© 2026 MONOCHROME Automobile Ltd. Tous fiches techniques vérifiées.</p>
          </div>
          <div className="flex gap-4.5 justify-center flex-wrap">
            <span className="text-zinc-600">Calculateur APR: 4,9%</span>
            <span>·</span>
            <span className="text-zinc-600">Format d'exportation: PDF Sheet</span>
            <span>·</span>
            <span className="text-zinc-600">Parc localisé: France</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
