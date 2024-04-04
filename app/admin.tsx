import { ListGuesser, Admin as RAAdmin, Resource } from "react-admin";
import { RAFirebaseOptions, FirebaseDataProvider } from "react-admin-firebase";
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

export default function AdminScreen() {
  return (
    <RAAdmin dataProvider={dataProvider}>
      <Resource name="orders" list={ListGuesser} />
    </RAAdmin>
  );
}
