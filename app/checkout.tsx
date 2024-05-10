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
  Label,
  Paragraph,
  Stack,
  Text,
  TextArea,
} from "tamagui";

export default function CheckoutScreen() {
  const { lines } = useDataProvider();
  const { handleSubmit, register, setValue } = useForm<IOrder>();
  const router = useRouter();

  const onSubmit = (data: IOrder) => {
    // TODO: navigate to thank you page once order is created
    console.log("order", data);
  };

  useEffect(() => {
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
                <Paragraph>CONTACT</Paragraph>
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
                <Label>Comments</Label>
                <TextArea
                  placeholder="Comments..."
                  onChangeText={(val) =>
                    setValue("comments", val, { shouldValidate: true })
                  }
                />
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
