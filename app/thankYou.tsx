import { Container } from "@/components/Container";
import { useRouter } from "expo-router";
import { Text } from "tamagui";

export default function ThankYouScreen() {
  const router = useRouter();

  return (
    <Container>
      <Text>Thank You Screen</Text>
    </Container>
  );
}
