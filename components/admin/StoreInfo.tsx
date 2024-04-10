import { PAYMENT_METHODS } from "@/constants/PaymentMethods";
import { Card } from "@mui/material";
import {
  CheckboxGroupInput,
  SimpleForm,
  TextInput,
  TimeInput,
} from "react-admin";

export const StoreInfo = () => (
  <Card>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="address" fullWidth />
      <TextInput source="phone" fullWidth />
      <TimeInput source="openingTime" fullWidth />
      <TimeInput source="closingTime" fullWidth />
      <CheckboxGroupInput source="paymentMethods" choices={PAYMENT_METHODS} />
    </SimpleForm>
  </Card>
);
