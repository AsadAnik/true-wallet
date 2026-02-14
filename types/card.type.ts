/**
 * THE CARD TYPE ENTITY
 * This type is using for database as well
 */
// region Entity Type
export type CardType = {
    id: string;
    card_holder_name: string;
    card_number: string;
    bank_name: string;
    card_type: string;
    expire_date: Date;
    color: string;
    synced: number;
    created_at: string;
    updated_at: string;
};

/**
 * CREATE CARD TYPE
 * This type is using for create the cards from the ui and to store DB but from ui
 */
// region Create Type
export type CreateCardType = Omit<CardType, 'id' | 'created_at'>;

/**
 * CORE CARD TYPE
 * The core type that actually represents the card type like props
 */
// region Core Type
export type CoreCardType = Omit<CardType, 'id' | 'created_at'>;

/**
 * UPDATE CARD TYPE
 * This type will be using for update the card while from ui and to be into the entity
 */
// region Update Type
export type UpdateCardType = Partial<CoreCardType>;