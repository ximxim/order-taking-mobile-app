import {
  Form,
  Image,
  Input,
  Label,
  Stack,
  Text,
  TextArea,
  ToggleGroup,
  XStack,
  YStack,
} from "tamagui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FC, useEffect } from "react";
import { useDataProvider } from "@/components/DataProvider";
import { Container } from "@/components/Container";
import { useForm } from "react-hook-form";
import { IChoice, ILine, IVariant } from "@/models";

interface IVariantProps {
  variant: IVariant;
  index: number;
}

interface IChoiceProps {
  choice: IChoice;
  index: number;
}

const Variant: FC<IVariantProps> = ({ variant }) => {
  return (
    <YStack>
      <Label>
        <Text>{variant.type}</Text>
        {variant.isRequired && (
          <Text fontSize={12} ml="$1">
            (Required)
          </Text>
        )}
      </Label>
      <ToggleGroup type="single">
        <YStack alignItems="flex-start">
          {variant.choices.map((choice, index) => (
            <Choice choice={choice} index={index} />
          ))}
        </YStack>
      </ToggleGroup>
    </YStack>
  );
};

const Choice: FC<IChoiceProps> = ({ choice }) => {
  return (
    <YStack px={4} py={2} mt="0px !important">
      <XStack alignItems="center" gap="$4">
        <ToggleGroup.Item value={choice.label}></ToggleGroup.Item>
        <Label>
          <Text>{choice.label}</Text>
          <Text ml="$2" fontSize={12}>
            +${choice.price}
          </Text>
        </Label>
      </XStack>
    </YStack>
  );
};

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
          {item.variants.map((variant, index) => (
            <Variant variant={variant} index={index} />
          ))}
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
