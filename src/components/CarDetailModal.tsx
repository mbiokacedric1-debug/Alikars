/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  Gauge,
  Tag,
  CheckCircle,
  Hash,
  Activity,
  Briefcase,
  HelpCircle,
  Coins,
  Send,
  Sparkles,
} from "lucide-react";
import { Car } from "../types";

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  if (!car) return null;

  // Pricing values
  const prixTTC = Math.round(car.prixHT * 1.2);
  const tvaAmount = Math.round(car.prixHT * 0.2);

  // Simulation controls state
  const [apport, setApport] = useState<number>(Math.round(prixTTC * 0.15)); // Default 15% deposit
  const [duree, setDuree] = useState<number>(48); // default 48 months
  const interestRate = 0.049; // 4.9% APR

  // Dynamic Monthly calculation logic
  const principalLeft = prixTTC - apport;
  const monthlyRate = interestRate / 12;
  const isZeroMinusAndApportExceeded = principalLeft <= 0;
  const mensualite = isZeroMinusAndApportExceeded
    ? 0
    : Math.round(
        (principalLeft * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duree))
      );

  // Booking details state
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: `Bonjour, je suis très intéressé par votre ${car.marque} ${car.modele} (${car.annee}) affichée à ${prixTTC.toLocaleString()} €. Merci de me recontacter au plus vite.`,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop glassmorphism overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-modern"
          id="modal-backdrop-blur"
        />

        {/* Modal Sheet window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-none border border-white/10 bg-[#0c0c0c] p-0 text-white shadow-2xl"
          id={`detail-modal-${car.vin}`}
        >
          {/* Close button floating absolute */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-none bg-black/85 border border-white/10 text-zinc-300 transition-all hover:bg-brand-red hover:text-white hover:border-brand-red"
            id="close-modal-btn"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Grid Layout splits content */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Hand: Gorgeous Gallery & Image Showcase (5 cols) */}
            <div className="relative lg:col-span-5 bg-black border-r border-white/10 flex flex-col justify-between">
              <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden">
                <img
                  src={car.photoUrl}
                  alt={car.modele}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Left Floating Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-2 font-mono text-[9px] font-black text-brand-red uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    Véhicule en Stock
                  </div>
                  <h2 className="font-display text-4xl font-black uppercase italic tracking-tighter text-white">
                    {car.marque} {car.modele}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-400 font-mono uppercase tracking-widest font-black">
                    {car.motorisation}
                  </p>
                </div>
              </div>

              {/* Specs pill quick highlights on bottom helper */}
              <div className="hidden lg:grid grid-cols-2 gap-px border-t border-white/10 bg-white/5 p-4">
                <div className="p-3 text-center rounded-none bg-black/60 border border-white/10">
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Boîte</div>
                  <div className="font-display font-black text-sm uppercase italic text-white mt-0.5">{car.boite.replace("Boite ", "")}</div>
                </div>
                <div className="p-3 text-center rounded-none bg-black/60 border border-white/10">
                  <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono">Énergie</div>
                  <div className="font-display font-black text-sm uppercase italic text-white mt-0.5">{car.energie}</div>
                </div>
              </div>
            </div>

            {/* Right Hand: Structured Details, Spec lists & interactives (7 cols) */}
            <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between bg-[#0a0a0a]">
              <div>
                {/* Header Pricing / Year row */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-5 mb-6">
                  <div>
                    <div className="font-mono text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                      Tarification Exclusive
                    </div>
                    <div className="text-3xl font-black text-white font-mono mt-1 tracking-tighter">
                      {prixTTC.toLocaleString()} €
                      <span className="text-[10px] font-bold text-zinc-500 ml-1.5 uppercase font-sans">
                        TTC
                      </span>
                    </div>
                    <div className="text-[10.5px] text-zinc-400 font-mono mt-0.5 leading-none">
                      {car.prixHT.toLocaleString()} € HT · TVA (20%) {tvaAmount.toLocaleString()} €
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-none bg-black px-4 py-2 text-center border border-white/10">
                      <div className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Mise En Circ.</div>
                      <div className="font-mono text-xs font-black text-zinc-200">{car.annee}</div>
                    </div>
                    <div className="rounded-none bg-black px-4 py-2 text-center border border-white/10">
                      <div className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">Kilométrage</div>
                      <div className="font-mono text-xs font-black text-zinc-200">{car.kms.toLocaleString()} km</div>
                    </div>
                  </div>
                </div>

                {/* Tabs / Specifications grid */}
                <h4 className="font-display text-[10px] font-black uppercase tracking-widest text-[#dc2626] mb-3 flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-brand-red" />
                  Caractéristiques Techniques
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center justify-between rounded-none bg-black p-3 border border-white/10 text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Hash className="h-3.5 w-3.5" /> Code VIN
                    </span>
                    <span className="text-zinc-200 font-bold">{car.vin}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-none bg-black p-3 border border-white/10 text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" /> État du parc
                    </span>
                    <span className="text-zinc-200 font-bold uppercase">{car.etat}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-none bg-black p-3 border border-white/10 text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" /> Immatriculation
                    </span>
                    <span className="text-zinc-200 font-bold uppercase">
                      {car.immatriculation ? car.immatriculation : "En cours d'attribution"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-none bg-black p-3 border border-white/10 text-xs font-mono">
                    <span className="text-zinc-500">Teinte / Peinture</span>
                    <span className="text-zinc-200 font-bold uppercase">{car.couleur}</span>
                  </div>
                </div>

                {/* Interactive Simulator widget */}
                <div className="rounded-none border border-white/10 bg-white/5 p-5 mb-8">
                  <h4 className="font-display text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                    <Coins className="h-4 w-4 text-brand-red" />
                    Simulateur de financement personnalisé
                  </h4>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    {/* Apport Slider */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400 uppercase text-[10px] font-bold">Apport Personnel</span>
                        <span className="text-white font-bold">{apport.toLocaleString()} €</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={Math.round(prixTTC * 0.7)}
                        step={500}
                        value={apport}
                        onChange={(e) => setApport(Number(e.target.value))}
                        className="w-full accent-brand-red bg-zinc-950 h-1 cursor-pointer rounded-none"
                        id="modal-apport-simulator"
                      />
                      <div className="text-[9px] font-mono text-zinc-500 text-right uppercase">
                        Max: 70% de la valeur
                      </div>
                    </div>

                    {/* Duree Selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">
                        Durée du crédit
                      </label>
                      <div className="grid grid-cols-4 gap-1">
                        {[24, 36, 48, 60].map((m) => (
                          <button
                            key={m}
                            onClick={() => setDuree(m)}
                            className={`py-1.5 text-[10px] font-mono font-bold rounded-none border transition-all ${
                              duree === m
                                ? "border-brand-red bg-brand-red text-white shadow-lg font-black"
                                : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                            }`}
                          >
                            {m}M
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 mt-2">
                    <div className="text-[9px] text-zinc-500 font-mono max-w-sm uppercase leading-relaxed">
                      *Taux d'intérêt annuel fixe nominal de <strong className="text-[#dc2626]">4,9% TAEG</strong>. 
                      Prêt amortissable avec assurance optionnelle de base hors frais de dossier.
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[9px] uppercase font-black text-zinc-550 font-mono">
                        Mensualité Estimée
                      </div>
                      <div className="text-2xl font-black text-white font-mono tracking-tighter">
                        {mensualite.toLocaleString()} €
                        <span className="text-[10px] font-sans font-bold text-zinc-500 ml-1.5 uppercase">/mois</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Action Panel: Contact Form vs Success banner */}
              <div className="border-t border-white/10 pt-6 mt-4">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-none bg-green-950/10 border border-green-800/80 p-4 text-center"
                    id="booking-form-success"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-none bg-green-900/40 text-green-400 mb-2">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h5 className="font-display text-xs font-black uppercase text-white mb-1">
                      Demande transmise avec succès !
                    </h5>
                    <p className="text-[10.5px] text-green-300 font-mono uppercase tracking-tight">
                      Un conseiller commercial vous recontactera sous 2 heures ouvrées.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" id="form-booking-request">
                    <h5 className="font-display text-[10px] font-black uppercase tracking-widest text-[#dc2626] flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-brand-red" />
                      Demande d'essai ou d'informations
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          placeholder="Votre Nom & Prénom"
                          className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-semibold uppercase placeholder-zinc-650 focus:outline-none focus:border-brand-red text-white transition-all font-mono"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Adresse email"
                          className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-semibold uppercase placeholder-zinc-650 focus:outline-none focus:border-brand-red text-white transition-all font-mono"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          placeholder="Téléphone portable"
                          className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-semibold uppercase placeholder-zinc-650 focus:outline-none focus:border-brand-red text-white transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1">
                        <textarea
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-none border border-white/20 bg-white/5 p-3 text-[11px] font-semibold uppercase placeholder-zinc-650 focus:outline-none focus:border-brand-red text-white transition-all resize-none font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 rounded-none bg-brand-red text-white px-6 font-black text-[11px] uppercase tracking-widest hover:bg-brand-red-hover transition-all min-w-[125px] disabled:opacity-50 cursor-pointer"
                        id="btn-submit-booking"
                      >
                        {isSubmitting ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            Envoyer
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
