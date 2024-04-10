import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner, YStack } from "tamagui";

const DataProviderContext = createContext({});

export const useDataProvider = () => useContext(DataProviderContext);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <DataProviderContext.Provider value={{}}>
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
