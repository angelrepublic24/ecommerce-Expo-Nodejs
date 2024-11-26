import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Link } from 'expo-router';
import { Image } from '@/components/ui/image';
import { Pressable } from 'react-native';

export default function ProductListItem({ product }) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg flex-1">
        <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            resizeMode='contain'
            alt={`${product.name} image`}
          />
          <Text className="text-sm font-normal mb-2 text-typography-700 ">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            $ {product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}