import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Button, Stack, Text } from "tamagui";

export const HeaderRightCart: FC = () => {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.push("/cart")}
      variant="outlined"
      borderWidth={0}
      icon={<FontAwesome name="shopping-cart" size={24} />}
      iconAfter={
        // TODO: add a condition to look at line items
        <Stack backgroundColor="$red8" width={20} height={20} borderRadius={10}>
          <Text fontSize={16} lineHeight={20} textAlign="center">
            9
          </Text>
        </Stack>
      }
    />
  );
};
