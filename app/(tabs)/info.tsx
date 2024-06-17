import moment from "moment";
import {
  Phone,
  Clock,
  CreditCard,
  MapPin,
  ArrowRight,
} from "@tamagui/lucide-icons";
import { Accordion, Image, Text, View, ListItem } from "tamagui";
import { Container } from "@/components/Container";
import { useDataProvider } from "@/components/DataProvider";
import { PAYMENT_METHODS } from "@/constants/PaymentMethods";

export default function TabTwoScreen() {
  const { restaurantInfo } = useDataProvider();

  if (!restaurantInfo) return null;

  const items = [
    {
      icon: <Clock size={20} />,
      label: "OPENING HOURS",
      children: (
        <View>
          <Text>
            {moment(restaurantInfo.openingTime.toDate()).format("LT")} -{" "}
            {moment(restaurantInfo.closingTime.toDate()).format("LT")}
          </Text>
        </View>
      ),
    },
    {
      icon: <CreditCard size={20} />,
      label: "PAYMENT METHODS",
      children: restaurantInfo.paymentMethods.map((method, index) => (
        <ListItem
          padding={0}
          backgroundColor="$colorTransparent"
          icon={ArrowRight}
          key={index}
          title={PAYMENT_METHODS.find((m) => m.id === method)?.name}
        />
      )),
    },
    {
      icon: <MapPin size={20} />,
      label: "ADDRESS",
      children: (
        <View>
          <Text>{restaurantInfo.address}</Text>
        </View>
      ),
    },
    {
      icon: <Phone size={20} />,
      label: "PHONE",
      children: (
        <View>
          <Text>{restaurantInfo.phone}</Text>
        </View>
      ),
    },
  ];

  return (
    <Container>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Restaurant_N%C3%A4sinneula.jpg/640px-Restaurant_N%C3%A4sinneula.jpg",
        }}
        height={200}
        width="100%"
      />
      <Accordion
        overflow="hidden"
        type="multiple"
        defaultValue={items.map((item) => item.label)}
        disabled
      >
        {items.map((item, index) => (
          <Accordion.Item value={item.label} key={index}>
            <Accordion.Trigger padding={0}>
              <ListItem icon={item.icon} title={item.label} />
            </Accordion.Trigger>
            <Accordion.Content>{item.children}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
