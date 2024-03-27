import { Stack, Text } from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ItemScreen() {
  const { slug } = useLocalSearchParams();
  const { setOptions } = useNavigation();

  useEffect(() => {
    // TODO: replace this title with item title
    setOptions({
      title: slug,
    });
  }, [slug]);

  return (
    <Stack>
      <Text>Item Screen: {slug}</Text>
    </Stack>
  );
}
