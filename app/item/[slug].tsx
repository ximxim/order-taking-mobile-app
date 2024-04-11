import {
  Form,
  Image,
  Input,
  Label,
  Stack,
  Text,
  TextArea,
  YStack,
} from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useDataProvider } from "@/components/DataProvider";
import { Container } from "@/components/Container";
import { useForm } from "react-hook-form";
import { ILine } from "@/models";

export default function ItemScreen() {
  const { slug } = useLocalSearchParams();
  const { setOptions } = useNavigation();
  const { getItemById } = useDataProvider();
  const item = getItemById(slug as string);
  const { register, handleSubmit } = useForm<ILine>({
    defaultValues: {
      quantity: 1,
      value: [],
      price: item?.price,
      label: item?.label,
    },
  });

  useEffect(() => {
    // TODO: replace this title with item title
    setOptions({
      title: slug,
    });
  }, [slug]);

  const onSubmit = (data: ILine) => {
    console.log("data", data);
  };

  if (!item) return null;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <YStack gap={4} p={4}>
          <Image
            height="280px"
            minWidth="280px"
            width="100%"
            flex={1}
            source={{ uri: item.image.src, width: 280, height: 280 }}
          />
          <YStack>
            <Label>Special Instructions</Label>
            <TextArea
              placeholder="pepper / salt / cutlury..."
              {...register("instructions")}
            />
          </YStack>
          <YStack>
            <Label>Quantity</Label>
            <Input
              keyboardType="number-pad"
              defaultValue="1"
              {...register("quantity", { valueAsNumber: true, min: 1 })}
            />
          </YStack>
        </YStack>
      </Form>
    </Container>
  );
}
