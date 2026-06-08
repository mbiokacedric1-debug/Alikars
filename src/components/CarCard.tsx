/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Gauge, Calendar, Eye, Scale, Heart, Sparkles, Check } from "lucide-react";
import { Car } from "../types";

interface CarCardProps {
  key?: string;
  car: Car;
  onViewDetails: (car: Car) => void;
  isFavorite: boolean;
  onToggleFavorite: (car: Car) => void;
  isComparing: boolean;
  onToggleCompare: (car: Car) => void;
}

export default function CarCard({
  car,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare,
}: CarCardProps) {
  // Translate labels to beautiful inline badges
  const isNew = car.annee >= 2026 || car.kms <= 50;
  const prixTTC = Math.round(car.prixHT * 1.2);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-none border border-white/10 bg-[#0c0c0c]/90 transition-all duration-300 hover:border-brand-red hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
      id={`car-card-${car.vin}`}
    >
      {/* Dynamic Badge Overlays */}
      <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 pointer-events-none">
        {isNew && (
          <span className="flex items-center gap-1 bg-brand-red px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow font-display italic">
            <Sparkles className="h-3.5 w-3.5" />
            Nouveauté 2026
          </span>
        )}
        <span className="self-start bg-black/80 px-3 py-1 text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
          {car.etat}
        </span>
      </div>

      {/* Floating utility buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-none backdrop-blur-md transition-all duration-200 border border-white/10 ${
            isFavorite
              ? "bg-brand-red text-white border-brand-red"
              : "bg-black/85 text-zinc-300 hover:bg-black hover:text-brand-red"
          }`}
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          id={`btn-fav-${car.vin}`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(car);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-none backdrop-blur-md transition-all duration-200 border border-white/10 ${
            isComparing
              ? "bg-white text-black border-white"
              : "bg-black/85 text-zinc-300 hover:bg-black hover:text-white"
          }`}
          title={isComparing ? "Retirer du comparateur" : "Ajouter au comparateur"}
          id={`btn-compare-${car.vin}`}
        >
          {isComparing ? (
            <Check className="h-4 w-4 stroke-[3px]" />
          ) : (
            <Scale className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Car Photo Container */}
      <div
        className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer border-b border-white/10"
        onClick={() => onViewDetails(car)}
        id={`pic-container-${car.vin}`}
      >
        <img
          src={car.photoUrl}
          alt={`${car.marque} ${car.modele}`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        {/* Subtle Gradient Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-[10px] font-black text-brand-red tracking-widest uppercase">
            {car.marque}
          </span>
          <span className="font-mono text-[9px] text-zinc-600 font-bold tracking-tight">
            VIN: {car.vin.substring(0, 8)}...
          </span>
        </div>

        <h3
          onClick={() => onViewDetails(car)}
          className="line-clamp-1 mb-1 font-display text-2xl font-black italic uppercase text-white tracking-tighter leading-none transition-colors duration-200 hover:text-brand-red cursor-pointer"
        >
          {car.modele}
        </h3>

        <p className="line-clamp-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 h-4">
          {car.motorisation}
        </p>

        {/* Info Grid */}
        <div className="mb-6 grid grid-cols-3 gap-px border-y border-white/10 bg-white/5 py-3 text-xs">
          <div className="flex flex-col items-center justify-center p-1.5 text-center text-zinc-300">
            <Calendar className="mb-1 h-3.5 w-3.5 text-zinc-500" />
            <span className="font-mono font-bold text-[11px]">{car.annee}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-x border-white/10 p-1.5 text-center text-zinc-300">
            <Gauge className="mb-1 h-3.5 w-3.5 text-zinc-500" />
            <span className="font-mono font-bold text-[11px]">
              {car.kms.toLocaleString()} km
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-1.5 text-center text-zinc-300">
            <span className="mb-1 font-mono text-[9px] font-black text-zinc-500 uppercase tracking-widest">
              {car.boite.includes("auto") ? "AUTO" : "MANUAL"}
            </span>
            <span className="text-[10px] truncate max-w-full font-bold">
              {car.boite.replace("Boite ", "")}
            </span>
          </div>
        </div>

        {/* Pricing & Call to Action */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-xl font-black text-white font-mono tracking-tighter">
              {prixTTC.toLocaleString()} €
              <span className="text-[10px] font-bold text-zinc-500 ml-1.5 uppercase font-sans">TTC</span>
            </div>
            <div className="text-[10px] font-bold font-mono text-zinc-600">
              {car.prixHT.toLocaleString()} € HT
            </div>
          </div>

          <button
            onClick={() => onViewDetails(car)}
            className="border border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-205 hover:bg-brand-red hover:border-brand-red cursor-pointer"
            id={`btn-details-${car.vin}`}
          >
            Fiche
          </button>
        </div>
      </div>
    </motion.div>
  );
}
