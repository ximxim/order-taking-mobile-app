import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { Accordion, Avatar, ListItem, Paragraph, Text } from "tamagui";
import { router } from "expo-router";

export default function MenuScreen() {
  const { categories, getItemByCategory } = useDataProvider();

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
              {getItemByCategory(category.id).map((item) => (
                <ListItem
                  hoverTheme
                  onPress={() => router.push(`/item/${item.id}`)}
                  icon={
                    <Avatar circular size="$2">
                      <Avatar.Image src={item?.image?.src} />
                    </Avatar>
                  }
                  iconAfter={<Paragraph>${item.price}</Paragraph>}
                >
                  {item.label}
                </ListItem>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
