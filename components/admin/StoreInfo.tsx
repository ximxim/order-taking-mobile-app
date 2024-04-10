import { PAYMENT_METHODS } from "@/constants/PaymentMethods";
import { Card } from "@mui/material";
import {
  CheckboxGroupInput,
  SimpleForm,
  TextInput,
  TimeInput,
  useNotify,
} from "react-admin";
import { db } from "@/utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const StoreInfo = () => {
  const notify = useNotify();
  const [defaultValues, setDefaultValues] = useState<any>();
  const restaurantInfoRef = doc(db, "restaurant", "info");

  const handleSubmit = async (data: any) => {
    await setDoc(restaurantInfoRef, data);
    notify(`Info updated`, { type: "success" });
  };

  const fetchData = async () => {
    const snapshot = await getDoc(restaurantInfoRef);
    setDefaultValues(snapshot.data() || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!defaultValues) return null;

  return (
    <Card>
      <SimpleForm
        defaultValues={{
          ...defaultValues,
          openingTime: defaultValues?.openingTime?.toDate?.(),
          closingTime: defaultValues?.closingTime?.toDate?.(),
        }}
        onSubmit={handleSubmit}
        sanitizeEmptyValues
      >
        <TextInput source="name" fullWidth />
        <TextInput source="address" fullWidth />
        <TextInput source="phone" fullWidth />
        <TimeInput source="openingTime" fullWidth />
        <TimeInput source="closingTime" fullWidth />
        <CheckboxGroupInput source="paymentMethods" choices={PAYMENT_METHODS} />
      </SimpleForm>
    </Card>
  );
};
