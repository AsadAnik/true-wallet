import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { databaseService } from "@/database/database.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

// region App Interface
interface AppState {
    // State
    isInitialized: boolean;
    isDatabseReady: boolean;
    isOnline: boolean;
    theme: 'light' | 'dark' | 'system';
    currency: string;

    // Actions
    initialize: () => Promise<void>;
    setOnlineStatus: (isOnline: boolean) => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    setCurrency: (currency: string) => void;
}

// region App Store
export const useAppStore = create<AppState>()(
    persist(
        (set, _get) => ({
            // region Initial State
            isInitialized: false,
            isDatabseReady: false,
            isOnline: true,
            theme: 'system',
            currency: 'USD',

            // region Initialize app and Database
            initialize: async () => {
                try {
                    console.log('Initializing app...');

                    // Initilize Database
                    await databaseService.init();

                    set({
                        isInitialized: true,
                        isDatabseReady: true,
                    });

                    console.log('App initialized successfully.');

                } catch (error) {
                    console.error('App initialzation failed: ', error);
                    throw error;
                }
            },

            // region Set online/offline status
            setOnlineStatus: (isOnline: boolean) => {
                set({ isOnline });
                console.log(isOnline ? 'Online' : 'Offline');
            },

            // region Set theme
            setTheme: (theme: 'light' | 'dark' | 'system') => {
                set({ theme });
            },

            // region Set currency
            setCurrency: (currency: string) => {
                set({ currency });
            },
        }),
        {
            name: 'app-storage', // AsyncStorage key
            storage: createJSONStorage(() => AsyncStorage),
            // Only persist these values (Choose Persist by `partialize`)
            partialize: (state) => ({
                theme: state.theme,
                currency: state.currency,
            }),
        })
);