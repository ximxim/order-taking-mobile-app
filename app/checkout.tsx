import { BottomButton } from "@/components/BottomButton";
import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
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
  Stack,
  Text,
  TextArea,
  YStack,
} from "tamagui";

export default function CheckoutScreen() {
  const { lines } = useDataProvider();
  const { handleSubmit, register, setValue, formState } = useForm<IOrder>();
  const router = useRouter();

  const onSubmit = (data: IOrder) => {
    // TODO: navigate to thank you page once order is created
    console.log("order", data);
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("email", { required: true });
    register("phone", { required: true });
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
                <Paragraph>PAYMENT METHOD</Paragraph>
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
