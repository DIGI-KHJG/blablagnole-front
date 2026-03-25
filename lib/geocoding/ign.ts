/**
 * API d’autocomplétion / géocodage de l’État français (Géoplateforme).
 * @see https://data.geopf.fr/geocodage/completion
 */

export interface IgnCompletionItem {
  /**
   * Libellé complet proposé à l’utilisateur (par ex. « 10 Rue de la Paix 75002 Paris »).
   */
  fulltext: string;
  /**
   * Type de résultat (adresse, lieu, etc.).
   */
  type?: string;
  /**
   * Coordonnée X (longitude) renvoyée par l’API de complétion.
   */
  x?: number;
  /**
   * Coordonnée Y (latitude) renvoyée par l’API de complétion.
   */
  y?: number;
  /**
   * Nom de la voie (si disponible).
   */
  street?: string;
  /**
   * Numéro de voie (si disponible).
   */
  houseNumber?: string | number;
  /**
   * Code postal (si disponible).
   */
  postalCode?: string;
  /**
   * Nom de la commune.
   */
  city?: string;
  /**
   * Pays (souvent « France » pour ce service).
   */
  country?: string;
  /**
   * Latitude en WGS84 (si disponible).
   */
  lat?: number;
  /**
   * Longitude en WGS84 (si disponible).
   */
  lon?: number;
}

interface IgnCompletionRawItem {
  fulltext: string;
  country?: string;
  city?: string;
  oldcity?: string;
  kind?: string;
  zipcode?: string;
  street?: string;
  metropole?: boolean;
  classification?: number;
  x?: number;
  y?: number;
}

export interface IgnCompletionResponse {
  results: IgnCompletionRawItem[];
}

export interface AddressWithCoords {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  lat: number;
  lon: number;
}

const IGN_COMPLETION_BASE = "https://data.geopf.fr/geocodage/completion";

/**
 * Recherche d’adresses via l’API d’autocomplétion de l’État.
 * Utilise le paramètre `text` et limite le nombre de réponses.
 * @param query Texte de recherche saisi par l’utilisateur.
 * @param options Options (limit: nombre maximum de résultats).
 * @returns Liste de suggestions normalisées (coordonnées + champs principaux).
 */
export async function searchIgnAddresses(
  query: string,
  options?: { limit?: number },
): Promise<IgnCompletionItem[]> {
  if (!query?.trim()) return [];

  const params = new URLSearchParams({
    text: query.trim(),
    maximumResponses: String(options?.limit ?? 5),
    // On se limite aux adresses postales, pas aux POI.
    type: "StreetAddress",
    // Territoire France métropolitaine (le service est déjà centré sur la France,
    // mais on force ici pour être explicite).
    terr: "METROPOLE",
  });

  const res = await fetch(`${IGN_COMPLETION_BASE}/?${params.toString()}`);
  if (!res.ok) {
    // En cas d’erreur réseau, on renvoie simplement un tableau vide
    return [];
  }

  const raw = (await res.json()) as IgnCompletionResponse & {
    status?: string;
  };
  const results = raw.results ?? [];

  // On normalise ici la réponse de complétion (x/y, zipcode, city, fulltext, etc.)
  return results.map(
    (item): IgnCompletionItem => ({
      fulltext: item.fulltext,
      type: item.kind,
      x: item.x,
      y: item.y,
      street: item.street,
      houseNumber: undefined,
      postalCode: item.zipcode,
      city: item.city,
      // L’API est limitée à la France, on force donc explicitement ce champ.
      country: "France",
      lat: item.y,
      lon: item.x,
    }),
  );
}

/**
 * Convertit un résultat IGN en adresse normalisée avec coordonnées.
 * @param item Résultat issu de la complétion IGN.
 * @returns Adresse normalisée (rue, ville, code postal, pays, lat, lon).
 */
export function ignResultToAddressWithCoords(
  item: IgnCompletionItem,
): AddressWithCoords {
  const full = item.fulltext ?? "";

  // On tente d'extraire le code postal (5 chiffres) à partir du libellé complet.
  const postalMatch = full.match(/\b(\d{5})\b/);
  const extractedPostal = postalMatch?.[1];

  let cityFromFull = "";
  if (postalMatch) {
    const idx = full.indexOf(postalMatch[1]);
    if (idx >= 0) {
      const after = full.slice(idx + postalMatch[1].length).trim();
      cityFromFull = after.split(",")[0].trim();
    }
  }

  const streetParts = [item.street, item.houseNumber].filter(Boolean);
  let street =
    streetParts.length > 0 ? streetParts.join(" ") : full;

  // Si on a réussi à isoler la partie après le code postal (ville),
  // on peut considérer que la rue est la partie avant le code postal.
  if (postalMatch) {
    const idx = full.indexOf(postalMatch[1]);
    if (idx > 0) {
      street = full.slice(0, idx).replace(/,\s*$/, "").trim();
    }
  }

  return {
    street: (street || "—").replace(/,\s*$/, "").trim() || "—",
    city: item.city ?? cityFromFull,
    postalCode: item.postalCode ?? extractedPostal ?? "",
    // On force explicitement la France pour éviter des valeurs comme « StreetAddress »
    country: "France",
    lat: item.lat ?? 0,
    lon: item.lon ?? 0,
  };
}

/**
 * Géocode une adresse IGN à partir de son libellé (appel au service /search)
 * pour récupérer des coordonnées précises.
 * @param text Libellé de l’adresse (rue + code postal + ville).
 * @returns Adresse normalisée avec coordonnées, ou null si non trouvée.
 */
export async function geocodeIgnByText(
  text: string,
): Promise<AddressWithCoords | null> {
  if (!text?.trim()) return null;
  // On réutilise la complétion, limitée à 1 résultat, qui nous fournit déjà x/y.
  const [first] = await searchIgnAddresses(text, { limit: 1 });
  if (!first) return null;
  return ignResultToAddressWithCoords(first);
}


