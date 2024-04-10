import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner, YStack } from "tamagui";
import { db } from "@/utils/firebase";
import { getDoc, getDocs, doc } from "firebase/firestore";
import { IRestraunt } from "@/models";

interface IDataProviderContextProps {
  restaurantInfo?: IRestraunt;
}

const DataProviderContext = createContext<IDataProviderContextProps>({});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();

  const fetchRestaurantInfo = async () => {
    const restaurantInfoRef = doc(db, "restaurant", "info");
    const snapshot = await getDoc(restaurantInfoRef);
    setRestaurantInfo(snapshot.data() as IRestraunt);
  };

  const fetchData = async () => {
    await fetchRestaurantInfo();
    setIsReady(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider
      value={{
        restaurantInfo,
      }}
    >
      {isReady ? (
        children
      ) : (
        <YStack padding="$3" gap="$4" alignItems="center">
          <Spinner size="large" color="$orange10" />
        </YStack>
      )}
    </DataProviderContext.Provider>
  );
};
