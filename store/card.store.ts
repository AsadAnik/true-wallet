import { CoreCardType, CreateCardType, UpdateCardType } from "@/types";
import { cardRepository } from '@/database';
import { create } from "zustand";

interface CardState {
    // State
    cards: CoreCardType[];
    isLoading: boolean;
    error: string | null;

    // Actions
    loadCards: () => Promise<void>;
    createCards: (input: CreateCardType) => Promise<void>;
    updateCards: (id: string, input: UpdateCardType) => Promise<void>;
    deleteCard: (cardId: string) => Promise<void>;

    // Utils
    refreshCards: () => Promise<void>;
    clearError: () => void;
};

export const useCardStore = create((set, _get) => ({
    // Initial State
    cards: [],
    isLoading: false,
    error: null,

    // Actions Methods
    loadCards: async () => {
        set({ isLoading: true, error: null });

        try {
            console.log('Loading Cards...');
            const cards = await cardRepository.getAll();
            set({ cards, isLoading: false });

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to load";
            set({ error: message, isLoading: false });
            console.error('Load failed: ', error);
            throw error;
        }
    },
}));