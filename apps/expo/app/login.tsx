import { LoginScreen } from 'app/features/user/login-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '登入',
        }}
      />
      <LoginScreen />
    </>
  )
}
