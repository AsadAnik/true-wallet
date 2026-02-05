import { databaseService } from './database.service';
import { generateId, getCurrentTimestamp } from '@/utils/date.utils';
import { ExpenseType, ExpenseInputType } from '@/types';
import { SQLiteDatabase } from "expo-sqlite";

class ExpenseRepository {
    /**
     * Create a new expense
     * @param input
     */
    async create(input: ExpenseInputType): Promise<ExpenseType> {
        const db: SQLiteDatabase = databaseService.getDB();
        const timestamp = getCurrentTimestamp();
        const id = generateId();

        const expense: ExpenseType = {
            id,
            ...input,
            created_at: timestamp,
            updated_at: timestamp,
            synced: 0,
        };

        await db.runAsync(
            `INSERT INTO expenses (
                id, title, expense_date, currency_symbol, currency_amount, 
                icon_name, icon_color, card_id, synced, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                expense.id,
                expense.title,
                expense.expense_date,
                expense.currency_symbol,
                expense.currency_amount,
                expense.icon_name,
                expense.icon_color,
                expense.card_id ?? null,
                expense.synced,
                expense.created_at,
                expense.updated_at
            ]
        );

        return expense;
    }

    /**
     * Get all expenses
     */
    async getAll(): Promise<ExpenseType[]> {
        const db = databaseService.getDB();
        const expenses = await db.getAllAsync<ExpenseType>('SELECT * FROM expenses WHERE deleted = 0 ORDER BY expense_date DESC');
        return expenses || [];
    }

    /**
     * Get expense by id
     * @param id
     */
    async getById(id: string): Promise<ExpenseType | null> {
        const db = databaseService.getDB();
        const expense = await db.getFirstAsync<ExpenseType>('SELECT * FROM expenses WHERE id = ? AND deleted = 0', [id]);
        return expense || null;
    }

    /**
     * Delete expense by id
     * @param id
     */
    async delete(id: string): Promise<boolean> {
        const db = databaseService.getDB();
        const timestamp = getCurrentTimestamp();
        const result = await db.runAsync('UPDATE expenses SET deleted = 1, updated_at = ? WHERE id = ?', [timestamp, id]);
        return result.changes > 0;
    }

    /**
     * Update expense by id
     * @param id
     * @param input
     */
    async update(id: string, input: Partial<ExpenseInputType>): Promise<ExpenseType | null> {
        const db = databaseService.getDB();
        const existing = await this.getById(id);
        if (!existing) return null;

        const timestamp = getCurrentTimestamp();
        const updated: ExpenseType = {
            ...existing,
            ...input,
            updated_at: timestamp,
            synced: 0,
        };

        await db.runAsync(`UPDATE expenses 
            SET title = ?, currency_amount = ?, currency_symbol = ?, expense_date = ?, icon_name = ?, icon_color = ?, card_id = ? 
            WHERE id = ?`,
            [
                updated.title,
                updated.currency_amount,
                updated.currency_symbol,
                updated.expense_date,
                updated.icon_name,
                updated.icon_color,
                updated.card_id ?? null,
                updated.updated_at,
                id,
            ]
        );

        return updated;
    }

    /**
     * Get Total Amount
     */
    async getTotal(): Promise<void> {

    }
}

export const expenseRepository = new ExpenseRepository();