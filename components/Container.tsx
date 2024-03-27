import { FC, PropsWithChildren } from "react";
import { ScrollView, XStack, YStack } from "tamagui";

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView>
      <XStack justifyContent="center">
        <YStack flex={1} gap={4} maxWidth={600} pb={100}>
          {children}
        </YStack>
      </XStack>
    </ScrollView>
  );
};
