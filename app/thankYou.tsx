import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { CircleSlash2, HeartHandshake, Hourglass } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Text, XStack } from "tamagui";

export default function ThankYouScreen() {
  const router = useRouter();
  const { order } = useDataProvider();

  if (!order) return null;

  if (order.status === "pending") {
    return (
      <Container>
        <XStack justifyContent="center" mt="$4">
          <Hourglass width={24} height={24} />
        </XStack>
        <Text textAlign="center" fontWeight="bold">
          Waiting for a confirmation
        </Text>
        <Text textAlign="center">
          Your order has been placed. Please wait for a confirmation from the
          restaurant.
        </Text>
      </Container>
    );
  }

  if (order.status === "cancelled") {
    return (
      <Container>
        <XStack justifyContent="center" mt="$4">
          <CircleSlash2 width={24} height={24} />
        </XStack>
        <Text textAlign="center" fontWeight="bold">
          Order Cancelled
        </Text>
        <Text textAlign="center">
          Your order has been cancelled. Please contact the restraunt for more
          information.
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <XStack justifyContent="center" mt="$4">
        <HeartHandshake width={24} height={24} />
      </XStack>
      <Text textAlign="center" fontWeight="bold">
        Order Confirmed
      </Text>
      <Text textAlign="center">
        See you soon! Your order has been confirmed and will be ready for pickup
      </Text>
    </Container>
  );
}
