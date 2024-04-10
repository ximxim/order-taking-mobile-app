import {
  CustomRoutes,
  ListGuesser,
  Admin as RAAdmin,
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

export default function AdminScreen() {
  return (
    <div style={{ overflow: "scroll" }}>
      <RAAdmin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource {...CategoryEntity} />
        <Resource {...ItemEntity} />
        <CustomRoutes>
          <Route path="/info" element={<StoreInfo />} />
        </CustomRoutes>
      </RAAdmin>
    </div>
  );
}
