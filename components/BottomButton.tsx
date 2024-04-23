import { FC } from "react";
import { Button, XStack, Text } from "tamagui";

interface IBottomButton {
  label: string;
  total: string;
  onClick: () => void;
}

export const BottomButton: FC<IBottomButton> = ({ label, onClick, total }) => {
  return (
    <XStack position="absolute" bottom={0} left={0} right={0}>
      <Button onPress={onClick} w="100%" borderRadius={0}>
        <XStack gap={4} w="100%">
          <Text>{total}</Text>
          <XStack justifyContent="center" width="100%" borderLeftWidth={1}>
            <Text>{label}</Text>
          </XStack>
        </XStack>
      </Button>
    </XStack>
  );
};
