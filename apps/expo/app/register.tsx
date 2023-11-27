import { RegisterScreen } from 'app/features/user/register-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '註冊',
        }}
      />
      <RegisterScreen />
    </>
  )
}
