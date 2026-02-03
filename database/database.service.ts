import * as SQLite from 'expo-sqlite';
import { DATABASE_NAME, SCHEMA, INDEXES } from './schema';

/**
 * Database Service - Handles SQLite Operations
 */
class DatabaseService {
    private db: SQLite.SQLiteDatabase | null = null;
    private isInitialized = false;

    /**
     * Initialize Database
     */
    async init(): Promise<void> {
        if (this.isInitialized) return;

        try {
            this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);

            // Create tables and indexes
            await this.createTables();
            await this.createIndexes();

            this.isInitialized = true;
            console.log('Database Initialized');

        } catch (error) {
            console.error('Database init failed: ', error);
            throw error;
        }
    }

    /**
     * Create all tables
     * @private
     */
    private async createTables(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        await this.db.execAsync(`
            ${SCHEMA.createExpensesTable}
            ${SCHEMA.createCardsTable}
            ${SCHEMA.createSyncQueueTable}
        `);
    }

    /**
     * Create all indexes
     * @private
     */
    private async createIndexes(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        await this.db.execAsync(`
            ${INDEXES.expensesDataIndex}
            ${INDEXES.cardsDataIndex}
        `);
    }

    /**
     * Get the database instance
     */
    public getDB(): SQLite.SQLiteDatabase {
        if (!this.db || !this.isInitialized) {
            throw new Error('Database not initialized, Call init() first.');
        }

        return this.db;
    }
}

// Export the singleton instance
export const databaseService = new DatabaseService();