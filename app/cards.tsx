import React from 'react';
import { CardPickerView } from '@/features/my-cards';

// Mock Data
const initialCards = [
    {
        id: '1',
        bank: 'True Bank',
        number: '4242',
        type: 'visa',
        colors: ['#1A2980', '#26D0CE'],
        holder: 'Asad Anik',
        expires: '12/25'
    },
    {
        id: '2',
        bank: 'Neo Bank',
        number: '8899',
        type: 'mastercard',
        colors: ['#FF512F', '#DD2476'],
        holder: 'Asad Anik',
        expires: '09/26'
    },
    {
        id: '3',
        bank: 'Apex Bank',
        number: '1234',
        type: 'visa',
        colors: ['#42275a', '#734b6d'],
        holder: 'Asad Anik',
        expires: '01/28'
    },
];

// region CARDS SCREEN
const CardsScreen = () => {
    return <CardPickerView initialCards={initialCards as any}/>;
};

export default CardsScreen;
