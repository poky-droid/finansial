import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SahamScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.header}>Pasar Saham</Text>

                {/* Indeks Utama (e.g., IHSG) */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Indeks Utama (IHSG)</Text>
                    <Text style={styles.indexValue}>6,850.25</Text>
                    <Text style={styles.changePositive}>+0.85% (58.05)</Text>
                    {/* Placeholder untuk Grafik Garis */}
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderText}>[Grafik Harga Harian]</Text>
                    </View>
                </View>

                {/* Daftar Saham Watchlist */}
                <Text style={styles.sectionTitle}>Saham Favorit Anda</Text>
                
                {/* Saham 1 */}
                <View style={styles.listItem}>
                    <Ionicons name="trending-up" size={24} color="#2ECC71" style={styles.listIcon} />
                    <Text style={styles.listText}>BBCA - Bank Central Asia</Text>
                    <View style={styles.listDetail}>
                        <Text style={styles.listSubText}>Rp9.250</Text>
                        <Text style={[styles.listValue, styles.changePositive]}>+2.1%</Text>
                    </View>
                </View>
                
                {/* Saham 2 */}
                <View style={[styles.listItem, styles.listItemNegative]}>
                    <Ionicons name="trending-down" size={24} color="#E74C3C" style={styles.listIcon} />
                    <Text style={styles.listText}>TLKM - Telkom Indonesia</Text>
                    <View style={styles.listDetail}>
                        <Text style={styles.listSubText}>Rp3.850</Text>
                        <Text style={[styles.listValue, styles.changeNegative]}>-0.5%</Text>
                    </View>
                </View>

                {/* Tambahkan lebih banyak item saham di sini... */}

            </ScrollView>
        </SafeAreaView>
    );
}

// ------------------------------------------------------------------
// STYLING SHEET
// ------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F9', // Latar belakang ringan
    },
    scrollContent: {
        padding: 15,
    },

    // HEADER
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1E2B47', // Biru Tua
        marginBottom: 20,
    },

    // CARD UTAMA (IHSG)
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 14,
        color: '#777',
        marginBottom: 4,
        fontWeight: '500',
    },
    indexValue: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1E2B47',
    },
    
    // PERUBAHAN HARGA
    changePositive: {
        fontSize: 18,
        color: '#2ECC71', // Hijau
        fontWeight: 'bold',
        marginTop: 5,
    },
    changeNegative: {
        fontSize: 18,
        color: '#E74C3C', // Merah
        fontWeight: 'bold',
        marginTop: 5,
    },

    // PLACEHOLDER GRAFIK
    chartPlaceholder: {
        height: 120,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    placeholderText: {
        color: '#AAAAAA',
        fontSize: 14,
    },

    // SECTION WATCHLIST
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E2B47',
        marginTop: 10,
        marginBottom: 10,
    },

    // LIST ITEM SAHAM
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2ECC71', // Default border hijau
    },
    listItemNegative: {
        borderLeftColor: '#E74C3C', // Border merah untuk saham turun
    },
    listIcon: {
        marginRight: 15,
    },
    listText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    listDetail: {
        alignItems: 'flex-end',
    },
    listValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listSubText: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    }
});