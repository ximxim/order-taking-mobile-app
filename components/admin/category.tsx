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
} from "react-admin";

const CategoryCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
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
};
