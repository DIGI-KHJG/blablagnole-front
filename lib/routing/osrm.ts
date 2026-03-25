/**
 * OSRM (Open Source Routing Machine) : calcul d’itinéraire, distance et durée.
 * @see https://router.project-osrm.org/
 */

export interface RouteResult {
  distanceKm: number;
  durationMin: number;
}

const OSRM_BASE = "https://router.project-osrm.org";

/**
 * Calcule l’itinéraire automobile entre deux points (OSRM).
 * @param origin Point de départ (lat, lon).
 * @param destination Point d’arrivée (lat, lon).
 * @returns Distance en km et durée en minutes.
 */
export async function getRoute(
  origin: { lat: number; lon: number },
  destination: { lat: number; lon: number }
): Promise<RouteResult> {
  const coords = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
  const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Impossible de calculer l'itinéraire");
  }
  const data = await res.json();
  const code = data.code;
  if (code !== "Ok") {
    throw new Error(
      data.message ?? "Aucun itinéraire trouvé entre ces deux points"
    );
  }
  const route = data.routes?.[0];
  if (!route) {
    throw new Error("Aucun itinéraire trouvé");
  }
  const distanceM = route.distance as number;
  const durationS = route.duration as number;
  return {
    distanceKm: Math.round((distanceM / 1000) * 10) / 10,
    durationMin: Math.round(durationS / 60),
  };
}
