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
} from "react-admin";

const CategoryCreate = () => {
  return (
    <Create>
      <SimpleForm sanitizeEmptyValues>
        <ImageInput source="image" label="Image">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="description" fullWidth />
      </SimpleForm>
    </Create>
  );
};

const CategoryEdit = () => {
  return (
    <Edit>
      <SimpleForm sanitizeEmptyValues>
        <ImageInput source="image" label="Image">
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="description" fullWidth />
      </SimpleForm>
    </Edit>
  );
};

const CategoryList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <ImageField source="image.src" />
        <TextField source="id" />
        <TextField source="title" />
        <DateField source="createdate" />
        <DateField source="lastupdate" />
      </Datagrid>
    </List>
  );
};

export const CategoryEntity: ResourceProps = {
  name: "category",
  list: CategoryList,
  create: CategoryCreate,
  edit: CategoryEdit,
};
