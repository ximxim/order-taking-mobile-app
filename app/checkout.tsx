import { Container } from "@/components/Container";
import { useRouter } from "expo-router";
import { Button, Stack, Text } from "tamagui";

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <Container>
      <Text>Checkout Screen</Text>
      <Button onPress={() => router.replace("/thankYou")}>Next</Button>
    </Container>
  );
}
