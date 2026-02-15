import { CardType, CoreCardType, CreateCardType, UpdateCardType } from "@/types";
import { cardRepository } from '@/database';
import { create } from "zustand";

interface CardState {
    // State
    cards: CardType[];
    isLoading: boolean;
    error: (string | null);

    // Actions
    loadCards: () => Promise<void>;
    createCard: (input: CreateCardType) => Promise<CardType>;
    updateCard: (id: string, input: UpdateCardType) => Promise<void>;
    deleteCard: (cardId: string) => Promise<void>;

    // Utils
    refreshCards: () => Promise<void>;
    clearError: () => void;
}

// region Card Store
export const useCardStore = create<CardState>((set, get) => ({
    // Initial State
    cards: [],
    isLoading: false,
    error: null,

    // Actions Methods
    /**
     * LOAD THE WHOLE CARDS
     */
    // region Load Cards
    loadCards: async (): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
            console.log('Loading Cards...');
            const cards = await cardRepository.getAll();
            set({ cards, isLoading: false });

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to Load";
            set({ error: message, isLoading: false });
            console.error('Load failed: ', error);
            throw error;
        }
    },

    /**
     * CREATE CARD METHOD
     * @param input
     */
    // region Create Card
    createCard: async (input: CreateCardType): Promise<CardType> => {
        set({ isLoading: true, error: null });

        try {
            console.log('Creating Card...');

            // Save to Database
            const card: CardType = await cardRepository.create(input);

            // Update Store (add to beginning of array)
            set((state) => ({
                cards: [card, ...state.cards],
                isLoading: false
            }));

            return card;

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to Create";
            set({ error: message, isLoading: false });
            console.error('Create Failed: ', error);
            throw error;
        }
    },

    /**
     * UPDATE CARD METHOD
     * @param id
     * @param input
     */
    // region Update Card
    updateCard: async (id: string, input: UpdateCardType): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
            console.log('Updating Card...');

            // Save to Database
            const updatedCard = await cardRepository.update(id, input);

            // Update store (update to the existing item)
            if (updatedCard) {
                set((state) => ({
                    cards: state.cards.map(card => card.id === id ? updatedCard : card),
                    isLoading: false
                }));
                console.log('Card Updated!');
            }

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to Update";
            set({ error: message, isLoading: false });
            console.error('Update Failed: ', error);
            throw error;
        }
    },

    /**
     * DELETE CARD METHOD
     * @param id
     */
    // region Delete Card
    deleteCard: async (id: string): Promise<void> => {
        set({ isLoading: true, error: null });

        try {
            console.log('Deleting Card...');

            // Save to Database
            const deletedCard = await cardRepository.delete(id);

            if (deletedCard) {
                set((state) => ({
                    cards: state.cards.filter(card => card.id !== id),
                    isLoading: false
                }));
                console.log('Card Deleted!');
            }

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to Delete";
            set({ error: message, isLoading: false });
            console.error('Delete Failed: ', error);
            throw error;
        }
    },

    // Utils
    // region Refresh Cards
    refreshCards: async (): Promise<void> => {
        await get().loadCards();
    },

    // region Clear Error
    clearError: (): void => {
        set({ error: null });
    },
}));