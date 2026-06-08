/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Scale, Trash2, Calendar, Gauge, Zap, Sparkles } from "lucide-react";
import { Car } from "../types";

interface CompareSectionProps {
  compareList: Car[];
  onRemoveFromCompare: (car: Car) => void;
  onClearAll: () => void;
}

export default function CompareSection({
  compareList,
  onRemoveFromCompare,
  onClearAll,
}: CompareSectionProps) {
  if (compareList.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="rounded-none border-t-2 border-brand-red border-x border-b border-white/10 bg-[#0a0a0a] p-6 shadow-2xl"
      id="compare-container-dock"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-black uppercase italic text-white tracking-widest flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand-red" />
            COMPARATEUR TECHNIQUE ({compareList.length}/3)
          </h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
            ANALYSEZ LES CARACTÉRISTIQUES TECHNIQUE CÔTE À CÔTE
          </p>
        </div>

        <button
          onClick={onClearAll}
          className="flex items-center gap-1.5 self-start sm:self-center font-mono text-xs text-zinc-400 uppercase tracking-widest hover:text-brand-red transition-all cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Vider la sélection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {compareList.map((car) => {
          const prixTTC = Math.round(car.prixHT * 1.2);
          const isBestPrice =
              compareList.length > 1 &&
              car.prixHT === Math.min(...compareList.map((c) => c.prixHT));
          const isBestKms =
              compareList.length > 1 &&
              car.kms === Math.min(...compareList.map((c) => c.kms));

          return (
            <motion.div
              key={car.vin}
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative flex flex-col rounded-none border border-white/10 bg-black overflow-hidden"
              id={`compare-card-${car.vin}`}
            >
              {/* Photo & Model Name */}
              <div className="relative aspect-video w-full bg-zinc-900 border-b border-white/10">
                <img
                  src={car.photoUrl}
                  alt={car.modele}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Floating Clear badge */}
                <button
                  onClick={() => onRemoveFromCompare(car)}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-none bg-black/85 border border-white/10 text-zinc-400 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all"
                  title="Retirer du comparateur"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Model Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="font-mono text-[9px] font-black text-brand-red uppercase tracking-widest">
                    {car.marque}
                  </div>
                  <div className="font-display font-black text-base uppercase italic tracking-tighter text-white">
                    {car.modele}
                  </div>
                </div>
              </div>

              {/* Comparative Matrix Rows */}
              <div className="p-4 space-y-3.5 text-xs">
                {/* Motorisation */}
                <div>
                  <div className="text-[9px] uppercase font-black text-zinc-500 font-mono mb-0.5 tracking-widest">
                    Motorisation
                  </div>
                  <div className="font-mono text-[11px] font-bold text-zinc-200 truncate" title={car.motorisation}>
                    {car.motorisation}
                  </div>
                </div>

                {/* Grid of basic specs */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/5 p-2.5 rounded-none border border-white/10">
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 flex items-center gap-1 tracking-widest">
                      <Calendar className="h-3 w-3" /> ANNEE
                    </div>
                    <div className="font-mono font-bold text-zinc-200 text-[11px]">{car.annee}</div>
                  </div>

                  <div
                    className={`p-2.5 rounded-none border ${
                      isBestKms
                        ? "bg-green-950/10 border-green-700/50 text-green-400"
                        : "bg-white/5 border-white/10 text-zinc-200"
                    }`}
                  >
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 flex items-center gap-1 tracking-widest">
                      <Gauge className="h-3 w-3" /> DISTANCE
                    </div>
                    <div className="font-bold font-mono text-[11px]">
                      {car.kms.toLocaleString()} km
                    </div>
                  </div>
                </div>

                {/* Gearbox / Fuel */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 tracking-widest">
                      TRANSMISSION
                    </div>
                    <div className="font-mono font-black text-zinc-300">
                      {car.boite.replace("Boite ", "")}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 tracking-widest">
                      ÉNERGIE
                    </div>
                    <div className="font-mono font-black text-zinc-300 uppercase">{car.energie}</div>
                  </div>
                </div>

                {/* Color & VIN Code */}
                <div className="grid grid-cols-2 gap-2 border-y border-white/10 py-2">
                  <div>
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 tracking-widest">
                      COULEUR
                    </div>
                    <div className="text-zinc-300 font-bold truncate uppercase">{car.couleur}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-zinc-500 font-mono mb-0.5 tracking-widest">
                      Code VIN
                    </div>
                    <div className="font-mono text-[9px] text-zinc-400 truncate" title={car.vin}>
                      {car.vin}
                    </div>
                  </div>
                </div>

                {/* Final Comparative Pricing metrics */}
                <div
                  className={`p-3 rounded-none border ${
                    isBestPrice
                      ? "bg-brand-red/10 border-brand-red/50 text-white animate-glow"
                      : "bg-[#111] border-white/10 text-zinc-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[8px] uppercase font-mono text-zinc-500 tracking-widest">
                        Tarif Final
                      </div>
                      <div className="text-lg font-black font-mono text-white leading-none">
                        {prixTTC.toLocaleString()} € <span className="text-[9px] font-sans font-bold uppercase text-zinc-500">TTC</span>
                      </div>
                    </div>
                    {isBestPrice && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-brand-red text-white text-[8px] uppercase font-black tracking-widest italic">
                        <Sparkles className="h-2.5 w-2.5" />
                        Optimal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* If fewer than 3 cars are active, show dashed invite placeholders */}
        {compareList.length < 3 && (
          <div className="flex/row flex flex-col md:col-span-1 border border-dashed border-white/10 rounded-none p-6 bg-black/40 items-center justify-center text-center text-xs text-zinc-500 min-h-[300px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-none border border-dashed border-white/10 mb-2.5 text-zinc-600">
              <Scale className="h-5 w-5" />
            </div>
            <p className="font-mono uppercase tracking-widest text-zinc-400 mb-1">MOTEUR DE COMPARAISON</p>
            <p className="text-[10px] text-zinc-650 max-w-xs font-sans leading-relaxed">
              Ajoutez d'autres fiches techniques du parc en cliquant sur le comparateur d'un véhicule.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
