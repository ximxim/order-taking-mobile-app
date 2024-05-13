import { BottomButton } from "@/components/BottomButton";
import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { PAYMENT_METHODS } from "@/constants/PaymentMethods";
import { IOrder } from "@/models";
import { calculateTotal } from "@/utils/calculations";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  Button,
  Form,
  Input,
  Label,
  Paragraph,
  RadioGroup,
  Stack,
  Text,
  TextArea,
  XStack,
  YStack,
} from "tamagui";

export default function CheckoutScreen() {
  const { lines, restaurantInfo, checkout } = useDataProvider();
  const { handleSubmit, register, setValue, formState } = useForm<IOrder>();
  const router = useRouter();

  const onSubmit = async (data: IOrder) => {
    await checkout(data);
    router.replace("/thankYou");
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("email", { required: true });
    register("phone", { required: true });
    register("paymentMethod", { required: true });
    register("comments");
  }, []);

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Accordion
            overflow="hidden"
            type="multiple"
            defaultValue={["CONTACT", "PAYMENT METHOD", "COMMENTS"]}
            disabled
          >
            <Accordion.Item value="CONTACT">
              <Accordion.Trigger>
                <Paragraph>CONTACT</Paragraph>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack mt={4}>
                  <YStack>
                    <Label>First Name</Label>
                    <Input
                      placeholder="First Name"
                      onChangeText={(val) =>
                        setValue("firstName", val, { shouldValidate: true })
                      }
                    />
                    {!!formState?.errors?.firstName?.type && (
                      <Text color="$red9">Required</Text>
                    )}
                  </YStack>
                  <YStack>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="Last Name"
                      onChangeText={(val) =>
                        setValue("lastName", val, { shouldValidate: true })
                      }
                    />
                    {!!formState?.errors?.firstName?.type && (
                      <Text color="$red9">Required</Text>
                    )}
                  </YStack>
                  <YStack>
                    <Label>Email</Label>
                    <Input
                      placeholder="Email"
                      onChangeText={(val) =>
                        setValue("email", val, { shouldValidate: true })
                      }
                    />
                    {!!formState?.errors?.firstName?.type && (
                      <Text color="$red9">Required</Text>
                    )}
                  </YStack>
                  <YStack>
                    <Label>Phone</Label>
                    <Input
                      placeholder="Phone"
                      onChangeText={(val) =>
                        setValue("phone", val, { shouldValidate: true })
                      }
                    />
                    {!!formState?.errors?.firstName?.type && (
                      <Text color="$red9">Required</Text>
                    )}
                  </YStack>
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="PAYMENT METHOD">
              <Accordion.Trigger>
                <Paragraph>PAYMENT METHOD</Paragraph>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack mt={4}>
                  <YStack>
                    <RadioGroup
                      onValueChange={(val) =>
                        setValue("paymentMethod", val as any, {
                          shouldValidate: true,
                        })
                      }
                    >
                      {restaurantInfo?.paymentMethods.map((method) => (
                        <XStack alignItems="center" gap="$2">
                          <RadioGroup.Item value={method}>
                            <RadioGroup.Indicator />
                          </RadioGroup.Item>
                          <Label>
                            {PAYMENT_METHODS.find((m) => m.id === method)?.name}
                          </Label>
                        </XStack>
                      ))}
                    </RadioGroup>
                    {!!formState?.errors?.paymentMethod?.type && (
                      <Text color="$red9">Required</Text>
                    )}
                  </YStack>
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="COMMENTS">
              <Accordion.Trigger>
                <Paragraph>COMMENTS</Paragraph>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack mt={4}>
                  <Label>Comments</Label>
                  <TextArea
                    placeholder="Comments..."
                    onChangeText={(val) =>
                      setValue("comments", val, { shouldValidate: true })
                    }
                  />
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Container>
      <BottomButton
        onClick={handleSubmit(onSubmit)}
        label="Go to checkout"
        total={`$${calculateTotal(lines, 13).toFixed(2)}`}
      />
    </>
  );
}
