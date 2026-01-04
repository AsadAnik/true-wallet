import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="add-expense" options={{ presentation: 'modal', title: 'Add Expense', headerShown: false }}/>
            <Stack.Screen name="settings" options={{ title: 'Settings' }}/>
            <Stack.Screen name="cards" options={{ headerShown: false }} />
        </Stack>
    );
}
