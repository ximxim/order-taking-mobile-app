import { useRouter } from "expo-router";
import { Button, Stack, Text } from "tamagui";

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <Stack>
      <Text>Checkout Screen</Text>
      <Button onPress={() => router.replace("/thankYou")}>Next</Button>
    </Stack>
  );
}
