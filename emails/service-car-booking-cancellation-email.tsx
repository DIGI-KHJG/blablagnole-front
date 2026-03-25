import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type ServiceCarBookingCancellationEmailProps = {
  collaboratorName?: string;
  vehicleLabel?: string;
  registrationPlate?: string;
  startAt?: string;
  endAt?: string;
  reason?: string;
};

const ServiceCarBookingCancellationEmail = (
  props: ServiceCarBookingCancellationEmailProps,
) => {
  const {
    collaboratorName = "Collaborateur",
    vehicleLabel = "Véhicule de service",
    registrationPlate = "AA-123-AA",
    startAt = "24/03/2026 09:00",
    endAt = "24/03/2026 18:00",
    reason = "Véhicule indisponible",
  } = props;

  return (
    <Html lang="fr" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Votre location de véhicule de service a été annulée</Preview>
        <Body className="bg-gray-100 font-sans py-[20px]">
          <Container className="bg-white rounded-[30px] p-[32px] max-w-[600px] mx-auto">
            <Section className="text-center">
              <Img
                src="https://i.ibb.co/QjmZTXSr/logo-bbgl.png"
                alt="Blablagnole Logo"
                className="w-full h-[80px] object-cover max-w-[200px] mx-auto"
              />
            </Section>

            <Section className="text-center mb-[16px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Votre location a été annulée
              </Heading>
            </Section>

            <Section>
              <Text className="text-[16px] text-gray-900 mb-[16px]">
                Bonjour {collaboratorName},
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                Votre réservation de véhicule de service a été annulée
                automatiquement car le véhicule est désormais indisponible.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                <strong>Motif :</strong> {reason}
              </Text>
            </Section>

            <Section className="mb-[16px] border-l-4 border-red-500 rounded-[12px]">
              <Section className="border border-gray-200 rounded-[12px] p-[20px] bg-white">
                <Text className="text-[17px] font-bold text-gray-900 m-0 mb-[10px]">
                  Détails de la location annulée
                </Text>
                <Text className="text-[14px] text-gray-700 m-0 mb-[4px]">
                  <strong>Véhicule :</strong> {vehicleLabel}
                </Text>
                <Text className="text-[14px] text-gray-700 m-0 mb-[4px]">
                  <strong>Plaque :</strong> {registrationPlate}
                </Text>
                <Text className="text-[14px] text-gray-700 m-0 mb-[4px]">
                  <strong>Début :</strong> {startAt}
                </Text>
                <Text className="text-[14px] text-gray-700 m-0">
                  <strong>Fin :</strong> {endAt}
                </Text>
              </Section>
            </Section>

            <Hr className="border-gray-200 my-[16px]" />
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                Blablagnole, 75001 Paris, France.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
                © 2026 Blablagnole. Tous droits réservés.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ServiceCarBookingCancellationEmail.PreviewProps = {
  collaboratorName: "Jean",
  vehicleLabel: "Renault Clio",
  registrationPlate: "AA-123-AA",
  startAt: "24/03/2026 09:00",
  endAt: "24/03/2026 18:00",
  reason: "Véhicule en réparation",
};

export default ServiceCarBookingCancellationEmail;
