import { Container } from "@/components/Container";
import { useRouter } from "expo-router";
import { Button, Text } from "tamagui";

export default function CartScreen() {
  const router = useRouter();

  return (
    <Container>
      <Text>Cart Screen</Text>
      <Button onPress={() => router.replace("/checkout")}>Next</Button>
    </Container>
  );
}
