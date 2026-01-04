import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

const TotalBalanceHeadView = () => {
    return (
        <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$24,500.00</Text>
            <View style={styles.percentageContainer}>
                <View style={styles.percentageBadge}>
                    <FontAwesome name="arrow-up" size={12} color="#4CAF50"/>
                    <Text style={styles.percentageText}>+15%</Text>
                </View>
                <Text style={styles.percentageLabel}>vs last month</Text>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    balanceContainer: {
        padding: 20,
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    percentageBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    percentageText: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 4,
    },
    percentageLabel: {
        color: '#999',
        fontSize: 12,
    }
});


export default TotalBalanceHeadView;