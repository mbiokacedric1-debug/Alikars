/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Car {
  vin: string;
  etat: string;
  immatriculation?: string;
  marque: string;
  modele: string;
  motorisation: string;
  annee: number;
  couleur: string;
  kms: number;
  boite: "Boite automatique" | "Boite manuelle";
  energie: string;
  prixHT: number;
  photoUrl: string;
}

export interface FilterState {
  search: string;
  marque: string;
  boite: string;
  maxPrix: number;
  maxKms: number;
  minAnnee: number;
  collorFilter: string;
}
