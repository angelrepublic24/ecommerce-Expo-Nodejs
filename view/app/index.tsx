import {FlatList, ActivityIndicator} from 'react-native';
import ProductListItem from '../components/productListItem/ProductListItem';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { listProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text';



export default function HomeScreen() {

    const {data, isLoading, error} = useQuery({
        queryKey: ['products'],
        queryFn: listProducts
    })


    const numColumns = useBreakpointValue({
        default: 2,
        sm: 3,
        xl: 4
    });

    if( isLoading){
        return <ActivityIndicator />;
    }

    if(error) {
        return <Text>Error fetching data</Text>
    }

    return(
        <FlatList
            key={numColumns}
            data={data}
            numColumns={numColumns}
            contentContainerClassName='gap-2 max-w-[960px] mx-auto w-full'
            columnWrapperClassName='gap-2'
            renderItem={({item}) => <ProductListItem  product={item} /> }
            />
    );
}

