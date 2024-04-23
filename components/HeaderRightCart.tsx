import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Button, Stack, Text } from "tamagui";
import { useDataProvider } from "./DataProvider";

export const HeaderRightCart: FC = () => {
  const router = useRouter();
  const { lines } = useDataProvider();

  return (
    <Button
      onPress={() => router.push("/cart")}
      variant="outlined"
      borderWidth={0}
      icon={<FontAwesome name="shopping-cart" size={24} />}
      iconAfter={
        lines.length ? (
          <Stack
            backgroundColor="$red8"
            width={20}
            height={20}
            borderRadius={10}
          >
            <Text fontSize={16} lineHeight={20} textAlign="center">
              {lines.length}
            </Text>
          </Stack>
        ) : undefined
      }
    />
  );
};
