import { format } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formate la durée en chaîne compacte (ex. "1h30" ou "1h00").
 * @param minutes Durée en minutes.
 * @returns Chaîne du type "XhYY".
 */
export function formatDurationCompact(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${String(m).padStart(2, "0")}` : `${h}h00`;
}

/**
 * Formate la date et l’heure de départ pour l’affichage (ex. "mar. 11 mars" et "14:30").
 * @param departureAt Date ou chaîne ISO du départ.
 * @returns Objet { date, time } au format français.
 */
export function formatDepartureDisplay(departureAt: string | Date): {
  date: string;
  time: string;
} {
  const d =
    typeof departureAt === "string" ? new Date(departureAt) : departureAt;
  return {
    date: format(d, "EEE d MMM", { locale: fr }),
    time: format(d, "HH:mm"),
  };
}
