import { useRouter } from "expo-router";
import { Stack, Text } from "tamagui";

export default function ThankYouScreen() {
  const router = useRouter();

  return (
    <Stack>
      <Text>Thank You Screen</Text>
    </Stack>
  );
}
