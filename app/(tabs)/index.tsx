import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { Accordion, Paragraph, Text } from "tamagui";

export default function MenuScreen() {
  const { categories } = useDataProvider();

  if (!categories) return null;

  return (
    <Container>
      <Accordion
        overflow="hidden"
        type="multiple"
        defaultValue={categories.map(({ id }) => id)}
        disabled
      >
        {categories.map((category) => (
          <Accordion.Item value={category.id} key={category.id}>
            <Accordion.Trigger>
              <Paragraph>{category.title}</Paragraph>
            </Accordion.Trigger>
            <Accordion.Content p={0}>
              <Text>This is fake content</Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
