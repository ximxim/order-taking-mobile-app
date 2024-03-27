import { useRouter } from "expo-router";
import { Button, Stack, Text } from "tamagui";

export default function CartScreen() {
  const router = useRouter();

  return (
    <Stack>
      <Text>Cart Screen</Text>
      <Button onPress={() => router.replace("/checkout")}>Next</Button>
    </Stack>
  );
}
