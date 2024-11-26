import { Button, ButtonText } from "@/components/ui/button"
import { FormControl } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Link, Redirect } from "expo-router"
import { EyeIcon, EyeOffIcon } from "lucide-react-native"
import { useState } from "react"
import { useForm } from "@/hooks/useForm"
import { useMutation } from "@tanstack/react-query"
import { login, register } from "@/api/auth"
import { HStack } from "@/components/ui/hstack"
import { useAuth } from "@/store/authStore"

export default function LoginScreen(){
    const {changed, form} = useForm({})
    const [showPassword, setShowPassword] = useState(false)

    const setUser = useAuth((state) => state.setUser);
    const setToken = useAuth((state) => state.setToken);
    const isLoggedIn = useAuth((state) => !!state.token)

    const loginMutation = useMutation({mutationFn: () => login(form),
      onSuccess: (data) => {
        console.log('Successfully sign in: ' + data)
        if(data.token && data.user){
          setToken(data.token);
          setUser(data.user);
        }
      },
      onError: () => {
        console.log('Failed to login')
      }
    })
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  console.log(isLoggedIn)
    if(isLoggedIn){
      console.log(isLoggedIn)
      return <Redirect href={'/'} />;
    }
  return (
    <FormControl isInvalid={loginMutation.error} className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2">
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField type="text"  onChangeText={text => changed(text, 'email')}/>
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField type={showPassword ? "text" : "password"} onChangeText={text => changed(text, 'password')} />
            <InputSlot className="pr-3" onPress={handleState}>
              {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                className="text-darkBlue-500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <Button
          className=""
          onPress={() => loginMutation.mutate()}
        >
          <ButtonText className="">Sign In</ButtonText>
        </Button>
        <Text>Don't you have an account? please <Link href={'/signup'}>Create one</Link></Text>
        
      </VStack>
    </FormControl>
  )
}