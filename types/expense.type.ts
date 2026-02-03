import { CardType } from '.';

export type ExpenseType = {
    id: number;
    title: string;
    card: CardType;
    date: Date;
    currency_symbol: string;
    currency_amount: number;
    icon_name: string;
    icon_color: string;
    created_at: Date;
};