import {
  AppBar,
  CustomRoutes,
  Layout,
  Admin as RAAdmin,
  RefreshIconButton,
  Resource,
} from "react-admin";
import {
  RAFirebaseOptions,
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import { firebaseOptions } from "@/utils/firebase";
import { CategoryEntity } from "@/components/admin/category";
import { ItemEntity } from "@/components/admin/item";
import { Route } from "react-router-dom";
import { StoreInfo } from "@/components/admin/StoreInfo";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const options: RAFirebaseOptions = {
  logging: true,
  persistence: "session",
  lazyLoading: {
    enabled: true,
  },
  watch: ["orders"],
};

const dataProvider = FirebaseDataProvider(firebaseOptions, options);
const authProvider = FirebaseAuthProvider(firebaseOptions, {});

const MyAppBar = () => (
  <AppBar
    toolbar={
      <>
        <RefreshIconButton />
        <IconButton href="/admin#/info">
          <SettingsIcon style={{ color: "white" }} />
        </IconButton>
      </>
    }
  />
);

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

export default function AdminScreen() {
  return (
    <div style={{ overflow: "scroll" }}>
      <RAAdmin
        layout={MyLayout}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource {...CategoryEntity} />
        <Resource {...ItemEntity} />
        <CustomRoutes>
          <Route path="/info" element={<StoreInfo />} />
        </CustomRoutes>
      </RAAdmin>
    </div>
  );
}
