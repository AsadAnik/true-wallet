export const DATABASE_NAME = "true-wallet.db";

/**
 * SCHEMA TABLE
 * We are holding the expenses
 */
export const SCHEMA = {
    // region EXPENSES TABLE
    createExpensesTable: `
        CREATE TABLE IF NOT EXISTS expenses (
            id TEXT PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL, 
            expense_date TEXT NOT NULL,
            currency_symbol TEXT NOT NULL,
            currency_amount TEXT NOT NULL,
            icon_name TEXT NOT NULL,
            icon_color TEXT NOT NULL,
            synced INTEGER DEFAULT 0,
            card_id TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL
        )
    `,

    // region CARDS TABLE
    createCardsTable: `
        CREATE TABLE IF NOT EXISTS cards (
            id TEXT PRIMARY KEY NOT NULL, 
            card_holder_name TEXT NOT NULL,
            card_number TEXT NOT NULL,
            bank_name TEXT NOT NULL,
            card_type TEXT NOT NULL,
            expire_date TEXT NOT NULL,
            color TEXT NOT NULL,
            synced INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `,

    // region SYNC-QUEUE TABLE
    createSyncQueueTable: `
        CREATE TABLE IF NOT EXISTS sync_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_name TEXT NOT NULL,
            record_id TEXT NOT NULL,
            operation TEXT NOT NULL,
            data TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    `,
};

// Indexes for performance
export const INDEXES = {
    expensesDataIndex: `CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC)`,
    cardsDataIndex: `CREATE INDEX IF NOT EXISTS idx_cards_created_at ON cards(created_at DESC)`,
};