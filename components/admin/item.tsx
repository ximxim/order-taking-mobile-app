import {
  ResourceProps,
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
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
  ReferenceField,
  ChipField,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  number,
} from "react-admin";

const ItemForm = () => {
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

const ItemCreate = () => {
  return (
    <Create>
      <SimpleForm sanitizeEmptyValues>
        <ItemForm />
      </SimpleForm>
    </Create>
  );
};

const ItemEdit = () => {
  return (
    <Edit>
      <SimpleForm sanitizeEmptyValues>
        <ItemForm />
      </SimpleForm>
    </Edit>
  );
};

const ItemList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <ImageField source="image.src" />
        <TextField source="id" />
        <TextField source="label" />
        <NumberField source="price" />
        <ReferenceField source="category" reference="category">
          <ChipField source="title" />
        </ReferenceField>
        <DateField source="createdate" />
        <DateField source="lastupdate" />
      </Datagrid>
    </List>
  );
};

export const ItemEntity: ResourceProps = {
  name: "item",
  list: ItemList,
  create: ItemCreate,
  edit: ItemEdit,
};
