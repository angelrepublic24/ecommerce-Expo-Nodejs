import { Text } from "@/components/ui/text"
import { useAuth } from "@/store/authStore"
import { Redirect } from "expo-router"

export default function ProfileScreen(){
    const user = useAuth((s) => s.user)
    const isLoggedIn = useAuth((s) => !!s.token)
    if(!isLoggedIn){
        return <Redirect href={"/"} />
    }


    return(
        <Text>Hello ${user.email}</Text>
    )
}