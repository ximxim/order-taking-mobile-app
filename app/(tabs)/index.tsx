import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { Text } from "tamagui";

export default function MenuScreen() {
  const { restaurantInfo } = useDataProvider();
  return (
    <Container>
      <Text>{restaurantInfo?.name}</Text>
    </Container>
  );
}
