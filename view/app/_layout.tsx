import { Link, Stack } from "expo-router";
import '@/global.css';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon } from "@/components/ui/icon";
import { Home, ShoppingCart, ShoppingCartIcon, User } from 'lucide-react-native';
import { Pressable, View } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box } from "@/components/ui/box";
import { useAuth } from "@/store/authStore";

const queryClient = new QueryClient();
const Footer = () => {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((state) => !!state.token)

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#f8f8f8' }}>
      <Link href={'/'} asChild>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon as={Home} />
        </Pressable>
      </Link>
      {isLoggedIn ? 
      <Link href={'/profile'} asChild>
      <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon as={User} />
      </Pressable>
    </Link>
    :
    <Link href={'/login'} asChild>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon as={User} />
        </Pressable>
      </Link>
    }
      
      <Link href={'/cart'} asChild>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon as={ShoppingCartIcon} />
          <Text>{cartItemsNum}</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
      <Stack>
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
          <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
          <Stack.Screen name="(auth)/profile" options={{ title: "Profile" }} />
          <Stack.Screen name="(auth)/signup" options={{ title: "Sign Up" }} />

        </Stack>
        <Footer />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
