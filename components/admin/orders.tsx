import { ORDER_STATUS } from "@/constants/OrderStatus";
import { PAYMENT_METHODS } from "@/constants/PaymentMethods";
import {
  ResourceProps,
  List,
  Datagrid,
  TextField,
  DateField,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
  Edit,
  NumberField,
  NumberInput,
  ReferenceInput,
  SelectInput,
  ChipField,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  number,
  Labeled,
  SelectField,
  ArrayField,
  RadioButtonGroupInput,
} from "react-admin";

const OrdersForm = () => {
  return (
    <>
      <Labeled>
        <TextField source="firstName" />
      </Labeled>
      <Labeled>
        <TextField source="lastName" />
      </Labeled>
      <Labeled>
        <TextField source="phone" />
      </Labeled>
      <Labeled>
        <TextField source="email" />
      </Labeled>
      {/* <ChipField source="status" /> */}
      <Labeled>
        <NumberField
          source="total"
          options={{
            style: "currency",
            currency: "CAD",
          }}
        />
      </Labeled>
      <Labeled>
        <DateField source="pickupTime" showTime label="Pickup" />
      </Labeled>
      <Labeled>
        <TextField source="comments" />
      </Labeled>
      <Labeled>
        <SelectField source="paymentMethod" choices={PAYMENT_METHODS} />
      </Labeled>

      <RadioButtonGroupInput source="status" choices={ORDER_STATUS} />

      <ArrayField source="lines">
        <Datagrid bulkActionButtons={false}>
          <TextField source="label" />
          <TextField source="instructions" />
          <NumberField
            source="price"
            options={{
              style: "currency",
              currency: "CAD",
            }}
          />
          <NumberField source="quantity" />
          <ArrayField source="value">
            <Datagrid bulkActionButtons={false}>
              <TextField source="variant" />
              <TextField source="value" />
              <NumberField
                source="price"
                options={{
                  style: "currency",
                  currency: "CAD",
                }}
              />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
    </>
  );
};

const OrdersEdit = () => {
  return (
    <Edit>
      <SimpleForm sanitizeEmptyValues>
        <OrdersForm />
      </SimpleForm>
    </Edit>
  );
};

const OrdersList = () => {
  return (
    <List sort={{ field: "pickupTime", order: "DESC" }}>
      <Datagrid
        rowClick="edit"
        bulkActionButtons={false}
        rowSx={(record) =>
          record.status === "pending" ? { backgroundColor: "pink" } : {}
        }
      >
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="phone" />
        <TextField source="email" />
        <ChipField source="status" />
        <NumberField
          source="total"
          options={{
            style: "currency",
            currency: "CAD",
          }}
        />
        <DateField source="pickupTime" showTime label="Pickup" />
      </Datagrid>
    </List>
  );
};

export const OrdersEntity: ResourceProps = {
  name: "orders",
  list: OrdersList,
  edit: OrdersEdit,
};
