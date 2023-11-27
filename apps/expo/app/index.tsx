import { HomeScreen } from 'app/features/home/screen'
import { RegisterScreen } from 'app/features/user/register-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home2',
        }}
      />
      <RegisterScreen />
      {/* <HomeScreen /> */}
    </>
  )
}
