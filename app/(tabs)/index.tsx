import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { Text } from "tamagui";

export default function MenuScreen() {
  const { categories } = useDataProvider();
  return (
    <Container>
      {categories?.map((category) => (
        <Text>{category?.title}</Text>
      ))}
    </Container>
  );
}
