import CarpoolCancellationEmail from "@/emails/carpool-cancellation-email";
import { route } from "@/lib/api/zodRoute";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const resendFrom = process.env.RESEND_FROM || "";

/**
 * Envoie des emails d'annulation pour un covoiturage.
 */
type CancellationRecipient = {
  email: string;
  passengerName?: string;
};

/**
 * Données attendues dans le body pour envoyer les emails.
 */
type CarpoolCancellationEmailPayload = {
  recipients?: CancellationRecipient[];
  driverName?: string;
  tripRoute?: string;
  tripDate?: string;
  tripTime?: string;
};

/**
 * Envoie un email à chaque destinataire valide.
 * Renvoie le nombre d'emails envoyés.
 */
export const POST = route.handler(async (request, { body }) => {
  try {
    if (!process.env.RESEND_API_KEY || !resendFrom) {
      return Response.json(
        { message: "Configuration Resend manquante" },
        { status: 500 },
      );
    }

    const payload = body as CarpoolCancellationEmailPayload;
    const recipients = Array.isArray(payload?.recipients)
      ? payload.recipients.filter(
          (recipient): recipient is CancellationRecipient =>
            typeof recipient?.email === "string" &&
            recipient.email.trim() !== "",
        )
      : [];
    const driverName = payload?.driverName ?? "Conducteur";
    const tripRoute = payload?.tripRoute ?? "Trajet";
    const tripDate = payload?.tripDate ?? "Date inconnue";
    const tripTime = payload?.tripTime ?? "Heure inconnue";

    if (recipients.length === 0) {
      return Response.json({ sent: 0, message: "Aucun destinataire" });
    }

    const results = await Promise.all(
      recipients.map((recipient: CancellationRecipient) =>
        resend.emails.send({
          from: resendFrom,
          to: [recipient.email],
          subject: "Annulation de votre réservation de covoiturage",
          react: CarpoolCancellationEmail({
            passengerName: recipient.passengerName ?? "Passager",
            driverName,
            tripRoute,
            tripDate,
            tripTime,
          }),
        }),
      ),
    );

    const errorResult = results.find((result) => result.error);

    if (errorResult?.error) {
      return Response.json(
        {
          message:
            errorResult.error.message || "Erreur lors de l'envoi des emails",
          error: errorResult.error,
        },
        { status: 500 },
      );
    }

    return Response.json({
      sent: results.length,
      message: "Emails envoyés",
    });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'envoi des emails",
      },
      { status: 500 },
    );
  }
});
