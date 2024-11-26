import { createOrders } from "@/api/order";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { useMutation } from "@tanstack/react-query";
import { FlatList } from "react-native";

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const createOrderMutation = useMutation({
    mutationFn: () => createOrders(
      items.maps((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    ),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  });

  console.log(items);
  const onCheckout = () => {
    createOrderMutation.mutate();
  };

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) =>
        item ? (
          <HStack className="bg-white p-3">
            <VStack space="sm">
              <Text bold>{item.product.name}</Text>
              <Text>$ {item.product.price}</Text>
            </VStack>
            <Text className="ml-auto">{item.quantity}</Text>
          </HStack>
        ) : (
          <Text>No product</Text>
        )
      }
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
