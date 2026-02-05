import { CardType } from '.';

/**
 * The Real Expense Type
 * Using the Data Schema what aligned with Database model
 */
export type ExpenseType = {
    id: string;
    title: string;
    card_id: CardType;
    expense_date: Date;
    currency_symbol: string;
    currency_amount: number;
    icon_name: string;
    icon_color: string;
    created_at: string;
    updated_at: string;
    synced?: number;
};

/**
 * Expense Input Type
 * Input for creating a new expense
 * Excluding the id, created_at, updated_at, synced, deleted fields for better control
 */
export type ExpenseInputType = Omit<ExpenseType, 'id' | 'created_at' | 'updated_at' | 'synced' | 'deleted'>;