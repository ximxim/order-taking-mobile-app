import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner, YStack } from "tamagui";
import { db, auth } from "@/utils/firebase";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { ICategory, IItem, IRestraunt } from "@/models";

interface IDataProviderContextProps {
  restaurantInfo?: IRestraunt;
  items?: IItem[];
  categories?: ICategory[];
  getItemByCategory: (categoryId: string) => IItem[];
  getItemById: (itemId: string) => IItem | undefined;
}

const DataProviderContext = createContext<IDataProviderContextProps>({
  getItemByCategory: () => [],
  getItemById: () => undefined,
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();
  const [items, setItems] = useState<IItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchItems = async () => {
    const itemCollectionRef = collection(db, "item");
    const snapshot = await getDocs(itemCollectionRef);
    const tempItems: IItem[] = [];
    snapshot.forEach((item) => tempItems.push(item.data() as IItem));
    setItems(tempItems);
  };

  const fetchCategories = async () => {
    const categoryCollectionRef = collection(db, "category");
    const snapshot = await getDocs(categoryCollectionRef);
    const tempCategories: ICategory[] = [];
    snapshot.forEach((category) =>
      tempCategories.push(category.data() as ICategory)
    );
    setCategories(tempCategories);
  };

  const fetchRestaurantInfo = async () => {
    const restaurantInfoRef = doc(db, "restaurant", "info");
    const snapshot = await getDoc(restaurantInfoRef);
    setRestaurantInfo(snapshot.data() as IRestraunt);
  };

  const fetchData = async () => {
    await signInAnonymously(auth);
    await fetchRestaurantInfo();
    await fetchItems();
    await fetchCategories();
    setIsReady(true);
  };

  const getItemByCategory = (categoryId: string): IItem[] => {
    return items.filter((item) => item.category === categoryId);
  };

  const getItemById = (itemId: string) => {
    return items.find((item) => item.id === itemId);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider
      value={{
        restaurantInfo,
        items,
        categories,
        getItemByCategory,
        getItemById,
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
