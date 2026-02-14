import { databaseService } from './database.service';
import { generateId, getCurrentTimestamp } from '@/utils/date.utils';
import { SQLiteDatabase } from 'expo-sqlite';
import { CardType, CreateCardType, UpdateCardType } from '@/types';

class CardRepository {
    /**
     * Create a new card
     * @param input
     */
    // region Create
    async create(input: CreateCardType) {
        const db: SQLiteDatabase = databaseService.getDB();
        const timestamp = getCurrentTimestamp();
        const id = generateId();

        const card: CardType = {
            id,
            ...input,
            created_at: timestamp,
            updated_at: timestamp,
            synced: 0,
        };

        await db.runAsync(
            `INSERT INTO cards (id, card_holder_name, card_number, bank_name, card_type, expire_date, color, synced,
                                created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                card.id,
                card.card_holder_name,
                card.card_number,
                card.bank_name,
                card.card_type,
                card.expire_date instanceof Date ? card.expire_date.toISOString() : card.expire_date,
                card.color,
                typeof card.synced === 'number' ? card.synced : 0,
                card.created_at,
                card.updated_at,
            ]
        );

        return card;
    }

    /**
     * Get all Cards
     */
    // region Get All
    async getAll(): Promise<CardType[]> {
        const db = databaseService.getDB();
        const cards = await db.getAllAsync<CardType>('SELECT * FROM cards WHERE deleted = 0 ORDER BY created_at DESC')
        return cards || [];
    }

    /**
     * Get card by id
     * @param id
     */
    // region Get By Id
    async getById(id: string): Promise<CardType | null> {
        const db = databaseService.getDB();
        const card: CardType | null = await db.getFirstAsync('SELECT * FROM cards WHERE id = ? AND deleted = 0', [id]);
        return card || null;
    }

    /**
     * Update card by id
     * @param id
     */
    // region Delete
    async delete(id: string) {
        const db = databaseService.getDB();
        const timestamp = getCurrentTimestamp();
        const result = await db.runAsync('UPDATE cards SET deleted = 1, updated_at = ? WHERE id = ?', [timestamp, id]);
        return result.changes > 0;
    }

    /**
     * Update card by id
     * @param id
     * @param input
     */
    // region Update
    async update(id: string, input: UpdateCardType): Promise<CardType | null> {
        const db: SQLiteDatabase = databaseService.getDB();
        const timestamp = getCurrentTimestamp();
        const existing = await this.getById(id);
        if (!existing) return null;

        const updated: CardType = {
            ...existing,
            ...input,
            updated_at: timestamp,
            synced: 0,
        };

        await db.runAsync(`UPDATE cards
                           SET card_holder_name = ?,
                               card_number      = ?,
                               bank_name        = ?,
                               card_type        = ?,
                               expire_date      = ?,
                               color            = ?,
                               updated_at       = ?
                           WHERE id = ?`,
            [
                updated.card_holder_name,
                updated.card_number,
                updated.bank_name,
                updated.card_type,
                updated.expire_date instanceof Date ? updated.expire_date.toISOString() : updated.expire_date,
                updated.color,
                updated.updated_at,
                id,
            ]
        );

        return updated;
    }
}

export const cardRepository = new CardRepository();