/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, RotateCcw, SlidersHorizontal, Fuel, ShieldAlert } from "lucide-react";
import { FilterState } from "../types";

interface CarFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  uniqueBrands: string[];
  uniqueColors: string[];
  maxPossiblePrice: number;
  maxPossibleKms: number;
}

export default function CarFilters({
  filters,
  setFilters,
  uniqueBrands,
  uniqueColors,
  maxPossiblePrice,
  maxPossibleKms,
}: CarFiltersProps) {
  const handleReset = () => {
    setFilters({
      search: "",
      marque: "",
      boite: "",
      maxPrix: maxPossiblePrice,
      maxKms: maxPossibleKms,
      minAnnee: 2023,
      collorFilter: "",
    });
  };

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div
      className="rounded-none border border-white/10 bg-[#0a0a0a] p-6 backdrop-blur-md"
      id="car-filters-section"
    >
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-none bg-brand-red/10 text-brand-red border border-brand-red/20">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-base font-black uppercase italic text-white tracking-tighter">
              FILTRES DE RECHERCHE
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Ajustez la puissance et la tarification en temps réel
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 uppercase tracking-widest hover:text-brand-red transition-all cursor-pointer"
          id="btn-reset-filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Réinitialiser le tri
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#dc2626] font-display block">
            Recherche textuelle
          </label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="QUEL MODÈLE CHERCHEZ-VOUS..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full rounded-none border border-white/20 bg-white/5 p-3 pl-10 text-[11px] font-semibold uppercase placeholder-zinc-600 focus:outline-none focus:border-brand-red text-white transition-all font-mono"
              id="input-search-filter"
            />
          </div>
        </div>

        {/* Marque Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display block">
            Constructeur / Marque
          </label>
          <select
            value={filters.marque}
            onChange={(e) => updateFilter("marque", e.target.value)}
            className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-black uppercase text-white focus:outline-none focus:border-brand-red transition-all font-mono"
            id="select-marque-filter"
          >
            <option value="" className="bg-[#0a0a0a] text-white">Toutes les marques ({uniqueBrands.length})</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand} className="bg-[#0a0a0a] text-white">
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission / Boite Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display block">
            Organe de Transmission (Boîte)
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#111] p-1 border border-white/10 rounded-none">
            <button
              onClick={() => updateFilter("boite", "")}
              className={`py-1.5 text-[10px] font-black uppercase rounded-none transition-all ${
                filters.boite === ""
                  ? "bg-brand-red text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => updateFilter("boite", "Boite automatique")}
              className={`py-1.5 text-[10px] font-black uppercase rounded-none transition-all truncate px-1 ${
                filters.boite === "Boite automatique"
                  ? "bg-brand-red text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Auto
            </button>
            <button
              onClick={() => updateFilter("boite", "Boite manuelle")}
              className={`py-1.5 text-[10px] font-black uppercase rounded-none transition-all truncate px-1 ${
                filters.boite === "Boite manuelle"
                  ? "bg-brand-red text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              BVM
            </button>
          </div>
        </div>

        {/* Color Filter */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 font-display block">
            Teintes carrosserie
          </label>
          <select
            value={filters.collorFilter}
            onChange={(e) => updateFilter("collorFilter", e.target.value)}
            className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-black uppercase text-white focus:outline-none focus:border-brand-red transition-all font-mono"
            id="select-color-filter"
          >
            <option value="" className="bg-[#0a0a0a] text-white">Tous coloris</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color} className="bg-[#0a0a0a] text-white">
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
        {/* Max Price Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 font-display">Budget Max TTC</span>
            <span className="font-mono font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-none border border-brand-red/20">
              {Math.round(filters.maxPrix * 1.2).toLocaleString()} € TTC
            </span>
          </div>
          <input
            type="range"
            min={7000}
            max={maxPossiblePrice}
            step={500}
            value={filters.maxPrix}
            onChange={(e) => updateFilter("maxPrix", Number(e.target.value))}
            className="w-full accent-brand-red bg-zinc-900 h-1 cursor-pointer rounded-none"
            id="slider-price-filter"
          />
          <div className="flex justify-between text-[9px] font-mono text-zinc-550 uppercase">
            <span>8 400 € min</span>
            <span>{Math.round(maxPossiblePrice * 1.2).toLocaleString()} € max</span>
          </div>
        </div>

        {/* Max Kilometers Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70 font-display">Kilométrage Max</span>
            <span className="font-mono font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-none border border-brand-red/20">
              {filters.maxKms.toLocaleString()} km
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={maxPossibleKms}
            step={500}
            value={filters.maxKms}
            onChange={(e) => updateFilter("maxKms", Number(e.target.value))}
            className="w-full accent-brand-red bg-zinc-900 h-1 cursor-pointer rounded-none"
            id="slider-kms-filter"
          />
          <div className="flex justify-between text-[9px] font-mono text-zinc-550 uppercase">
            <span>Neuf (10 km)</span>
            <span>{maxPossibleKms.toLocaleString()} km max</span>
          </div>
        </div>

        {/* Minimal Year Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/70 font-display block">
            Mise en circulation min
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[2023, 2024, 2025, 2026].map((year) => (
              <button
                key={year}
                onClick={() => updateFilter("minAnnee", year)}
                className={`py-2 text-[10px] font-mono font-bold rounded-none border transition-all ${
                  filters.minAnnee === year
                    ? "border-brand-red bg-brand-red text-white shadow-lg font-black"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/25"
                }`}
                id={`btn-year-${year}`}
              >
                {year}+
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
