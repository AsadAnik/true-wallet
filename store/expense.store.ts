import { ExpenseCoreType, ExpenseInputType, ExpenseUpdateType } from '@/types';
import { create } from "zustand";
import { expenseRepository } from "@/database/expense.repository";

// region Expense Interface
interface ExpenseState {
    // State
    expenses: ExpenseCoreType[];
    isLoading: boolean;
    error: string | null;

    // Filters
    selectedCategory: string | null;

    // Actions
    loadExpenses: () => Promise<void>;
    createExpense: (expense: ExpenseCoreType) => Promise<ExpenseCoreType>;
    updateExpense: (id: string, input: Partial<ExpenseUpdateType>) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;

    // Filter Actions
    // setCategory: (category: string | null) => void;

    // Computed Values
    getFilteredExpenses: () => Promise<ExpenseCoreType[]>;
    getTotalExpenses: () => number;
    getExpensesByCategory: () => Array<{ category: string; total: number; count: number; }>;

    // Utils
    refreshExpenses: () => Promise<void>;
    clearError: () => void;
}

// region Expense Store
export const useExpenseStore = create<ExpenseState>(
    (set, _get) => ({
        // Initial State
        expenses: [],
        isLoading: false,
        error: null,
        seletedCategory: null,

        // Actions
        // region Load Expenses
        loadExpenses: async () => {
            set({ isLoading: true, error: null });

            try {
                console.log('Loading Expenses...');
                const expenses = await expenseRepository.getAll();
                set({ expenses, isLoading: false });

            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to load";
                set({ error: message, isLoading: false });
                console.error('Load failed: ', error);
            }
        },

        /**
         * CREATE EXPENSE METHOD
         * @param input
         */
        // region Create Expense
        createExpense: async (input: ExpenseInputType): Promise<ExpenseCoreType> => {
            set({ isLoading: true, error: null });

            try {
                console.log('Creating Expense: ', input.title);

                // Save to Database
                const expense = await expenseRepository.create(input);

                // Update store (add to beginning of array)
                set((state) => ({
                    expenses: [expense, ...state.expenses],
                    isLoading: false
                }));

                console.log('Expense created');
                return expense;

            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to load";
                set({ error: message, isLoading: false });
                console.error('Load failed: ', error);
                throw error;
            }
        },

        /**
         * UPDATE EXPENSE METHOD
         * @param id
         * @param input
         */
        // region Update Expense
        updateExpense: async (id: string, input: ExpenseUpdateType) => {
            set({ isLoading: true, error: null });

            try {
                console.log('Updating Expense: ', input.id);

                // Save to Database
                const updatedExpense = await expenseRepository.update(id, input);

                // Update store (update to the existing item)
                if (updatedExpense) {
                    set((state) => ({
                        expenses: state.expenses.map(exp => exp.id === id ? updatedExpense : exp),
                        isLoading: false
                    }));
                    console.log('Expense Updated!');
                }

            } catch (error) {
                const message = error instanceof Error ? error.message : "Failed to Update";
                set({ error: message, isLoading: false });
                console.error('Update Failed: ', error);
                throw error;
            }
        },

        /**
         * DELETE EXPENSE METHOD
         * @param id
         */
        // region Delete Expense
        deleteExpense: async (id: string) => {
            set({ isLoading: true, error: null });

            try {
                console.log('Deleting Expense: ', id);

                // Save to Database
                const deletedExpense = await expenseRepository.delete(id);

                if (deletedExpense) {
                    set((state) => ({
                        expenses: state.expenses.filter(exp => exp.id !== id),
                        isLoading: false
                    }));
                    console.log('Expense Deleted!');
                }

            } catch (error) {
                const message =
                    console.error('Delete Failed: ', error);
                throw error;
            }
        },

        /**
         * GET FILTERED EXPENSES METHOD
         * @param id
         */
        // region Get Filtered Expenses
        // getFilteredExpenses: async (id: string) => {},

        // region Get Total Expenses
        // getTotalExpenses: () => {},

        // region Get Expenses by Category
        getExpensesByCategory: async () => {
        },

        // region Refresh Expense
        refreshExpenses: async () => {
        },

        // region Clear Error
        clearError: () => {
        },
    }));