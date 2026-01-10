import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CardSelector, CurrencySelector, IconPicker, CategorySelector } from './components';
import { CalendarStrip } from '@/components/ui';
import { EXPENSE_STEPS, INCOME_STEPS, initialFormData, STEP_DESCRIPTIONS } from './IncomeExpense.constants';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

// region EXPENSE INCOME FORM
const ExpenseIncomeForm = ({ type }: { type: 'expense' | 'income' }) => {
    const isExpense: boolean = type === 'expense';
    const steps: string[] = isExpense ? EXPENSE_STEPS : INCOME_STEPS;
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialFormData);
    const translateX = useSharedValue(0);
    const { isDarkMode } = useTheme();
    const styles = useMemo(() => createStyles(isDarkMode), [isDarkMode]);

    useEffect(() => {
        setCurrentStep(0);
        setFormData(initialFormData);
        translateX.value = 0;
    }, [type]);

    // region Handle Next
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            translateX.value = withTiming(-width, { duration: 300 });

            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                translateX.value = width;
                translateX.value = withTiming(0, { duration: 300 });
            }, 300);

        } else {
            console.log('Final Form Data:', formData);
        }
    };

    // region Handle Back
    const handleBack = () => {
        if (currentStep > 0) {
            translateX.value = withTiming(width, { duration: 300 });
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                translateX.value = -width;
                translateX.value = withTiming(0, { duration: 300 });
            }, 300);
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // region Render Step
    const renderStep = () => {
        const currentStepName = steps[currentStep];

        switch (currentStepName) {
            case 'note':
                return (
                    <View style={{ padding: 20 }}>
                        <Text style={styles.label}>{isExpense ? "What was this expense for?" : "Add a note (optional)"}</Text>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="e.g., Coffee with friends"
                            placeholderTextColor={isDarkMode ? '#666' : '#ccc'}
                            value={formData.note}
                            onChangeText={(val) => updateFormData('note', val)}
                            autoFocus={true}
                        />
                    </View>
                );

            case 'card':
                return (
                    <CardSelector
                        selectedCard={formData.card}
                        onSelect={(key) => {
                            updateFormData('card', key);
                            handleNext();
                        }}
                    />
                );

            case 'date':
                return (
                    <CalendarStrip
                        selectedDate={formData.date}
                        onSelectDate={(d) => updateFormData('date', d)}
                    />
                );

            case 'amount':
                return (
                    <View style={{ padding: 20 }}>
                        <Text style={styles.label}>How much?</Text>
                        <View style={styles.amountInputRow}>
                            <CurrencySelector onSelect={(c) => updateFormData('currency', c)}/>
                            <TextInput
                                style={styles.amountInput}
                                placeholder="0.00"
                                keyboardType="numeric"
                                placeholderTextColor={isDarkMode ? '#666' : '#ccc'}
                                value={formData.amount}
                                onChangeText={(val) => updateFormData('amount', val)}
                                autoFocus={true}
                            />
                        </View>
                    </View>
                );

            case 'details':
                return isExpense ? (
                    <View style={{ padding: 20 }}>
                        <IconPicker onSelect={(icon, color) => updateFormData('icon', { icon, color })}/>
                    </View>
                ) : (
                    <View style={{ padding: 20 }}>
                        <CategorySelector onSelect={(cat) => updateFormData('category', cat)}/>
                    </View>
                );

            default:
                return null;
        }
    };

    const currentStepName: string = steps[currentStep];
    // Cast currentStepName to keyof typeof STEP_DESCRIPTIONS to satisfy TypeScript
    // and provide a fallback string.
    const description: string = STEP_DESCRIPTIONS[currentStepName as keyof typeof STEP_DESCRIPTIONS] || '';

    // region Main UI
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Animated.View style={[styles.animatedContainer, animatedStyle]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {renderStep()}
                        
                        <View style={styles.stepInfoContainer}>
                            <Text style={styles.descriptionText}>{description}</Text>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>

            {/* New Bottom Navigation */}
            <View style={styles.bottomNav}>
                {currentStep > 0 && (
                    <TouchableOpacity onPress={handleBack} style={styles.bottomBackButton}>
                        <Ionicons name="arrow-back-circle" size={44} color={isDarkMode ? '#fff' : '#333'} />
                    </TouchableOpacity>
                )}
                {steps[currentStep] !== 'card' && (
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// region STYLE-SHEET
const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    animatedContainer: {
        flex: 1,
    },
    stepInfoContainer: {
        paddingHorizontal: 40,
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 14,
        color: isDarkMode ? '#999' : '#666',
        textAlign: 'center',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDarkMode ? '#fff' : '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    noteInput: {
        fontSize: 20,
        backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        textAlign: 'center',
        color: isDarkMode ? '#fff' : '#000',
    },
    amountInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1,
        marginLeft: 15,
        color: isDarkMode ? '#fff' : '#000',
    },
    // New Bottom Navigation Styles
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: isDarkMode ? '#333' : '#f0f0f0',
    },
    bottomBackButton: {
        // The icon provides enough visual weight
    },
    nextButton: {
        flex: 1,
        backgroundColor: '#2196F3',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 20, // Add margin if both buttons are visible
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ExpenseIncomeForm;
