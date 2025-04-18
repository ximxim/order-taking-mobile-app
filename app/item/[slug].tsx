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
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { IChoice, ILine, IVariant } from "@/models";
import { Circle, CircleDot } from "@tamagui/lucide-icons";
import { BottomButton } from "@/components/BottomButton";
import { calculateItemTotal } from "@/utils/calculations";

interface IVariantProps {
  variant: IVariant;
  index: number;
}

interface IChoiceProps {
  variant: IVariant;
  choice: IChoice;
  index: number;
}

const Variant: FC<IVariantProps> = ({ variant }) => {
  const { control } = useFormContext<ILine>();
  const { append, fields, remove } = useFieldArray<ILine, "value">({
    control,
    name: "value",
  });
  const handleValueChange = (index: string | string[]) => {
    const removeAll = fields.reduce((acc, field: any, index) => {
      if (field.variant !== variant.type) return acc;
      return [...acc, index];
    }, [] as number[]);
    remove(removeAll);
    if (Array.isArray(index)) {
      const currIndexs = index
        .filter((i) => !!i)
        .map((i) => parseInt(i.split(":")[1]));

      currIndexs.forEach((i) =>
        append({
          price: variant.choices[i].price,
          value: variant.choices[i].label,
          variant: variant.type,
        })
      );
    } else {
      const currIndex = parseInt(index.split(":")[1]);
      append({
        variant: variant.type,
        price: variant.choices[currIndex].price,
        value: variant.choices[currIndex].label,
      });
    }
  };
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
      <ToggleGroup
        {...(variant.allowMultiple
          ? {
              type: "multiple",
              defaultValue: variant.isRequired
                ? [`${variant.type}:0`]
                : undefined,
            }
          : {
              type: "single",
              disableDeactivation: true,
              defaultValue: variant.isRequired
                ? `${variant.type}:0`
                : undefined,
            })}
        onValueChange={handleValueChange}
      >
        <YStack alignItems="flex-start">
          {variant.choices.map((choice, index) => (
            <Choice variant={variant} choice={choice} index={index} />
          ))}
        </YStack>
      </ToggleGroup>
    </YStack>
  );
};

const Choice: FC<IChoiceProps> = ({ choice, index, variant }) => {
  const { watch } = useFormContext<ILine>();
  const fields = watch("value");
  const isSelected =
    fields!.findIndex(
      (f) =>
        f.variant === variant.type &&
        variant.choices.findIndex((c) => c.label === f.value) === index
    ) > -1;
  return (
    <YStack px={4} py={2} mt="0px !important">
      <XStack alignItems="center" gap="$4">
        <ToggleGroup.Item value={`${variant.type}:${index}`}>
          {isSelected ? <CircleDot /> : <Circle />}
        </ToggleGroup.Item>
        <Label>
          <Text>{choice.label}</Text>
          <Text ml="$2" fontSize={12}>
            +${choice.price.toFixed(2)}
          </Text>
        </Label>
      </XStack>
    </YStack>
  );
};

export default function ItemScreen() {
  const { slug } = useLocalSearchParams();
  const { setOptions } = useNavigation();
  const { getItemById, addToCart } = useDataProvider();
  const item = getItemById(slug as string);
  const methods = useForm<ILine>({
    defaultValues: {
      quantity: 1,
      value: [],
      price: item?.price,
      label: item?.label,
    },
  });
  const { register, handleSubmit, control, watch } = methods;
  const { append } = useFieldArray<ILine, "value">({
    control,
    name: "value",
  });

  useEffect(() => {
    if (!item) return;
    setOptions({
      title: item.label,
    });

    if (!item.variants.length) return;

    item.variants
      .filter((variant) => variant.isRequired)
      .forEach((variant) =>
        append({
          price: variant.choices[0].price,
          value: variant.choices[0].label,
          variant: variant.type,
        })
      );
  }, [item]);

  const onSubmit = (data: ILine) => {
    addToCart(data);
  };

  if (!item) return null;

  return (
    <>
      <FormProvider {...methods}>
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
      </FormProvider>
      <BottomButton
        label="Add to cart"
        total={`$${calculateItemTotal(
          item.price,
          watch("quantity"),
          watch("value") || []
        ).toFixed(2)}`}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
}
