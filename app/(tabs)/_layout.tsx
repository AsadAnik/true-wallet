import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../components/widgets/CustomHeader';
import { useTheme } from '@/context/ThemeContext';

// region TAB LAYOUT
const TabLayout = () => {
    const router = useRouter();
    const { isDarkMode } = useTheme();

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: isDarkMode ? '#888' : '#999',
            tabBarStyle: {
                backgroundColor: isDarkMode ? '#121212' : '#fff',
                borderTopColor: isDarkMode ? '#333' : '#eee',
            },
            header: ({ options }) => <CustomHeader title={options.title || ''} />,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="dashboard" color={color} />
                }}
            />
            <Tabs.Screen
                name="add-expense-placeholder"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#2196F3',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            elevation: 5,
                            shadowColor: isDarkMode ? '#fff' : '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}>
                            <FontAwesome name="plus" size={30} color="white" />
                        </View>
                    ),
                    tabBarButton: (props: any) => (
                        <TouchableOpacity
                            {...props}
                            onPress={() => router.push('/add-expense')}
                            delayLongPress={props.delayLongPress || undefined}
                            disabled={props.disabled || undefined}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="wallet"
                options={{
                    title: 'Wallet',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="google-wallet" color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    header: ({ options }) => (
                        <CustomHeader
                            title={options.title || ''}
                            headerRight={
                                <TouchableOpacity onPress={() => router.push('/settings')}>
                                    <FontAwesome name="cog" size={24} color={isDarkMode ? '#fff' : '#333'} />
                                </TouchableOpacity>
                            }
                        />
                    ),
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
};

export default TabLayout;