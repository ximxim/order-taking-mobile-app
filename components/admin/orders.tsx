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
} from "react-admin";

const OrdersForm = () => {
  return (
    <>
      <ImageInput source="image" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput source="category" reference="category">
        <SelectInput optionText="title" fullWidth validate={[required()]} />
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
      <NumberInput source="price" validate={[required(), number()]} fullWidth />
      <ArrayInput source="variants">
        <SimpleFormIterator fullWidth>
          <TextInput source="type" helperText={false} fullWidth />
          <ArrayInput source="choices">
            <SimpleFormIterator inline>
              <TextInput source="label" />
              <NumberInput source="price" defaultValue={0} />
            </SimpleFormIterator>
          </ArrayInput>
          <BooleanInput source="allowMultiple" helperText={false} fullWidth />
          <BooleanInput source="isRequired" helperText={false} fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
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
