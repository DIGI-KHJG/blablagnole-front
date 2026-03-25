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

type CarpoolCancellationEmailProps = {
  passengerName?: string;
  driverName?: string;
  tripRoute?: string;
  tripDate?: string;
  tripTime?: string;
};

const CarpoolCancellationEmail = (props: CarpoolCancellationEmailProps) => {
  const {
    passengerName = "Jean",
    driverName = "Sarah Johnson",
    tripRoute = "Paris vers Lyon",
    tripDate = "25 mars 2026",
    tripTime = "08:00",
  } = props;

  return (
    <Html lang="fr" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Votre réservation de covoiturage a été annulée</Preview>
        <Body className="bg-gray-100 font-sans py-[20px]">
          <Container className="bg-white rounded-[30px] p-[32px]  max-w-[600px] mx-auto">
            {/* Logo */}
            <Section className="text-center">
              <Img
                src="https://i.ibb.co/QjmZTXSr/logo-bbgl.png"
                alt="Blablagnole Logo"
                className="w-full h-[80px] object-cover max-w-[200px] mx-auto"
              />
            </Section>
            {/* En-tête */}
            <Section className="text-center mb-[16px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Votre réservation de covoiturage a été annulée
              </Heading>
            </Section>

            {/* Contenu principal */}
            <Section className="">
              <Text className="text-[16px] text-gray-900 mb-[16px]">
                Bonjour {passengerName},
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                Je suis au regret de vous informer que je dois annuler notre
                prochain covoiturage en raison d&apos;un imprévu. Je comprends
                que cela puisse être soudain et je m&apos;excuse pour les
                désagréments que cela peut vous occasionner.
              </Text>

              <Text className="text-[16px] text-gray-700">
                Voici les détails de votre réservation annulée :
              </Text>
            </Section>

            {/* Carte covoiturage (inspiree de carpool-card) */}
            <Section className="mb-[16px] border-l-4 border-red-500 rounded-[12px]">
              <Section className="border border-gray-200 rounded-[12px] p-[20px] bg-white">
                <Section className="mb-[12px]">
                  <Text className="text-[17px] font-bold text-gray-900 m-0 mb-[10px]">
                    Votre Trajet
                  </Text>
                  <Text className="text-[17px] font-bold text-gray-900 m-0">
                    {tripRoute}
                  </Text>
                </Section>

                <Section>
                  <Text className="text-[14px] text-gray-700 m-0 mb-[4px]">
                    <strong>Date</strong> : {tripDate} à {tripTime}
                  </Text>
                  <Text className="text-[14px] text-gray-700 m-0">
                    <strong>Conducteur</strong> : {driverName}
                  </Text>
                </Section>

                <Section className="text-right mt-[10px]">
                  <Text className="text-[12px] font-semibold text-white bg-red-500 inline-block rounded-[999px] px-[10px] py-[4px] m-0">
                    ANNULÉ
                  </Text>
                </Section>
              </Section>
            </Section>

            {/* Pied de page */}
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

CarpoolCancellationEmail.PreviewProps = {
  passengerName: "Jean",
  driverName: "Sarah Johnson",
  tripRoute: "Paris vers Lyon",
  tripDate: "25 mars 2026",
  tripTime: "08:00",
};

export default CarpoolCancellationEmail;
