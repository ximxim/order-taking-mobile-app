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
} from "react-admin";

const ItemForm = () => {
  return (
    <>
      <ImageInput source="image" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput source="category" reference="category">
        <SelectInput optionText="title" fullWidth />
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
      <NumberInput source="price" fullWidth />
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
