import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner, YStack } from "tamagui";
import { db, auth, functions } from "@/utils/firebase";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { signInAnonymously } from "firebase/auth";
import { ICategory, IItem, ILine, IOrder, IRestraunt } from "@/models";

interface IDataProviderContextProps {
  restaurantInfo?: IRestraunt;
  items?: IItem[];
  lines: ILine[];
  categories?: ICategory[];
  order?: IOrder;
  getItemByCategory: (categoryId: string) => IItem[];
  getItemById: (itemId: string) => IItem | undefined;
  addToCart: (line: ILine) => void;
  removeFromCart: (index: number) => void;
  checkout: (order: IOrder) => Promise<string>;
}

const DataProviderContext = createContext<IDataProviderContextProps>({
  lines: [],
  getItemByCategory: () => [],
  getItemById: () => undefined,
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  checkout: async () => "",
});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestraunt>();
  const [items, setItems] = useState<IItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [lines, setLines] = useState<ILine[]>([]);
  const [order, setOrder] = useState<IOrder>();

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

  const addToCart = (line: ILine) => setLines([...lines, line]);

  const removeFromCart = (itemToRemoveIndex: number) =>
    setLines(lines.filter((_, index) => index !== itemToRemoveIndex));

  const checkout = async (order: IOrder) => {
    const placeOrder = httpsCallable<IOrder, { id: string; order: IOrder }>(
      functions,
      "placeorder"
    );
    const { data } = await placeOrder({ ...order, lines });
    setLines([]);
    setOrder(data.order);
    onSnapshot(doc(db, "orders", data.id), (docSnapshot) => {
      setOrder(docSnapshot.data() as IOrder);
    });

    return data.id;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataProviderContext.Provider
      value={{
        restaurantInfo,
        items,
        lines,
        categories,
        order,
        getItemByCategory,
        getItemById,
        addToCart,
        removeFromCart,
        checkout,
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
