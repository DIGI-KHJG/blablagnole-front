import ServiceCarBookingCancellationEmail from "@/emails/service-car-booking-cancellation-email";
import { route } from "@/lib/api/zodRoute";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const resendFrom = process.env.RESEND_FROM || "";

/**
 * Envoie les emails d'annulation pour une réservation de véhicule de service.
 */
type CancellationRecipient = {
  email: string;
  collaboratorName?: string;
  startAt?: string;
  endAt?: string;
};

type ServiceCarBookingCancellationEmailPayload = {
  recipients?: CancellationRecipient[];
  vehicleLabel?: string;
  registrationPlate?: string;
  reason?: string;
};

/**
 * Envoie les emails d'annulation.
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

    const payload = body as ServiceCarBookingCancellationEmailPayload;
    const recipients = Array.isArray(payload?.recipients)
      ? payload.recipients.filter(
          (recipient): recipient is CancellationRecipient =>
            typeof recipient?.email === "string" &&
            recipient.email.trim() !== "",
        )
      : [];

    if (recipients.length === 0) {
      return Response.json({ sent: 0, message: "Aucun destinataire" });
    }

    const vehicleLabel = payload?.vehicleLabel ?? "Véhicule de service";
    const registrationPlate = payload?.registrationPlate ?? "Plaque inconnue";
    const reason = payload?.reason ?? "Véhicule indisponible";

    const results = await Promise.all(
      recipients.map((recipient) =>
        resend.emails.send({
          from: resendFrom,
          to: [recipient.email],
          subject: "Annulation de votre location de véhicule de service",
          react: ServiceCarBookingCancellationEmail({
            collaboratorName: recipient.collaboratorName ?? "Collaborateur",
            vehicleLabel,
            registrationPlate,
            startAt: recipient.startAt ?? "Date inconnue",
            endAt: recipient.endAt ?? "Date inconnue",
            reason,
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
