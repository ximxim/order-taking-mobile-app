import { ListGuesser, Admin as RAAdmin, Resource } from "react-admin";
import {
  RAFirebaseOptions,
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from "react-admin-firebase";
import { firebaseOptions } from "@/utils/firebase";

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
    <RAAdmin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="orders" list={ListGuesser} />
    </RAAdmin>
  );
}
