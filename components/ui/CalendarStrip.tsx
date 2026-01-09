import React, { useState, useEffect, useRef, useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from '@/context/ThemeContext';

interface CalendarStripProps {
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

// region CALENDAR STRIP
const CalendarStrip = ({ selectedDate, onSelectDate }: CalendarStripProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const scrollViewRef = useRef<ScrollView>(null);
    const { isDarkMode } = useTheme();

    // Memoize styles to avoid recreation on every render, recalculating only when theme changes
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    // Generate days for the current month
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i);
            days.push({
                fullDate: d.toISOString().split('T')[0],
                day: i,
                weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
                isToday: d.toDateString() === new Date().toDateString(),
            });
        }
        return days;
    };

    const days = getDaysInMonth(currentMonth);

    const changeMonth = (increment: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + increment);
        setCurrentMonth(newDate);
    };

    const displayMonth = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Scroll to selected date or today when month changes
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
    }, [currentMonth]);

    // region MAIN-UI
    return (
        <View style={styles.calendarContainer}>
            <View style={styles.monthHeader}>
                <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.arrowButton}>
                    <FontAwesome name="chevron-left" size={16} color={isDarkMode ? '#fff' : '#333'} />
                </TouchableOpacity>

                <Text style={styles.monthText}>{displayMonth}</Text>

                <TouchableOpacity onPress={() => changeMonth(1)} style={styles.arrowButton}>
                    <FontAwesome name="chevron-right" size={16} color={isDarkMode ? '#fff' : '#333'} />
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.calendarScroll}
            >
                {days.map((date, index) => {
                    const isSelected = selectedDate === date.fullDate;
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onSelectDate(date.fullDate)}
                            style={[
                                styles.dateItem,
                                isSelected && styles.dateItemSelected,
                                date.isToday && !isSelected && styles.dateItemToday
                            ]}
                        >
                            <Text style={[styles.dateWeekday, isSelected && styles.textSelected]}>
                                {date.weekday}
                            </Text>
                            <Text style={[styles.dateDay, isSelected && styles.textSelected]}>
                                {date.day}
                            </Text>
                            {date.isToday && (
                                <View
                                    style={[styles.dot, isSelected ? { backgroundColor: '#fff' } : { backgroundColor: '#2196F3' }]}/>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

// region STYLE-SHEET GENERATOR
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    calendarContainer: {
        paddingVertical: 15,
        backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 10,
    },
    monthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
    },
    arrowButton: {
        padding: 10,
    },
    calendarScroll: {
        paddingHorizontal: 15,
    },
    dateItem: {
        width: 50,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginRight: 12,
        backgroundColor: isDarkMode ? '#2C2C2C' : '#F8F9FA',
    },
    dateItemSelected: {
        backgroundColor: '#2196F3',
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    dateItemToday: {
        borderWidth: 1,
        borderColor: '#2196F3',
        backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
    },
    dateWeekday: {
        fontSize: 12,
        color: isDarkMode ? '#AAA' : '#999',
        marginBottom: 6,
        fontWeight: '500',
    },
    dateDay: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
    },
    textSelected: {
        color: '#fff',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginTop: 6,
    },
});

export default CalendarStrip;
