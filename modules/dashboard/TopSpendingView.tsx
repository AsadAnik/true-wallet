import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/context/ThemeContext';

interface CategoryItemProps {
    icon: string;
    iconColor: string;
    bgColor: string;
    name: string;
    progress: string;
    amount: string;
    styles: any; // Pass styles down
    isDarkMode: boolean;
}

// region CATEGORY ITEM
const CategoryItem = ({ icon, iconColor, bgColor, name, progress, amount, styles, isDarkMode }: CategoryItemProps) => (
    <View style={styles.categoryItem}>
        <View style={[styles.categoryIcon, { backgroundColor: isDarkMode ? '#333' : bgColor }]}>
            <FontAwesome name={icon as any} size={20} color={iconColor}/>
        </View>
        <View style={styles.categoryDetails}>
            <Text style={styles.categoryName}>{name}</Text>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: progress, backgroundColor: iconColor }]}/>
            </View>
        </View>
        <Text style={styles.categoryAmount}>{amount}</Text>
    </View>
);

// region TOP SPENDING VIEW
const TopSpendingView = () => {
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    return (
        <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Top Spending</Text>
            <CategoryItem
                icon="shopping-cart"
                iconColor="#FF9800"
                bgColor="#FFF3E0"
                name="Shopping"
                progress="60%"
                amount="-$450"
                styles={styles}
                isDarkMode={isDarkMode}
            />
            <CategoryItem
                icon="cutlery"
                iconColor="#2196F3"
                bgColor="#E3F2FD"
                name="Food & Drink"
                progress="30%"
                amount="-$220"
                styles={styles}
                isDarkMode={isDarkMode}
            />
            <CategoryItem
                icon="car"
                iconColor="#9C27B0"
                bgColor="#F3E5F5"
                name="Transport"
                progress="15%"
                amount="-$85"
                styles={styles}
                isDarkMode={isDarkMode}
            />
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    categoriesSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 20,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#000' : '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    categoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    categoryDetails: {
        flex: 1,
        marginRight: 16,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 8,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: isDarkMode ? '#333' : '#F0F0F0',
        borderRadius: 3,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    categoryAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F44336',
    },
});

export default TopSpendingView;
