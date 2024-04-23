import { BottomButton } from "@/components/BottomButton";
import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { XCircle } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, Heading, Text, XStack, YStack } from "tamagui";

export default function CartScreen() {
  const router = useRouter();
  const { lines, removeFromCart } = useDataProvider();

  return (
    <>
      <Container>
        <YStack px={4} py={2} mt={4}>
          {lines.map((line, index) => (
            <XStack mb="$4" key={index}>
              <Heading flex={1} fontSize={16} maxWidth={50}>
                {line.quantity}x
              </Heading>
              <YStack flex={4}>
                <Heading fontSize={16}>{line.label}</Heading>
                {line.value?.map((value, key) => (
                  <Text key={key}>
                    {value.variant}: {value.value}
                  </Text>
                ))}
              </YStack>
              <YStack flex={1}>
                <Heading fontSize={16} textAlign="right">
                  ${line.price.toFixed(2)}
                </Heading>
                {line.value?.map((value, key) => (
                  <Text key={key} textAlign="right">
                    +${value.price.toFixed(2)}
                  </Text>
                ))}
              </YStack>
              <XStack justifyContent="flex-end" flex={1} maxWidth={100}>
                <Button
                  size="xs"
                  icon={<XCircle />}
                  onPress={() => removeFromCart(index)}
                />
              </XStack>
            </XStack>
          ))}
        </YStack>
      </Container>
      <BottomButton
        onClick={() => router.replace("/checkout")}
        label="Go to checkout"
        total="$0.00"
      />
    </>
  );
}
