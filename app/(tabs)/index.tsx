import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Data Contoh (Simulasi data) ---
const totalBalance = 12450.75;
const financialSummary = {
  income: 5200.00,
  expense: 2750.00,
  remaining: 2450.75,
};
const recentTransactions = [
  { id: '1', type: 'expense', category: 'Groceries', description: 'Supermarket', amount: -50.00, date: 'Oct 26' },
  { id: '2', type: 'income', category: 'Salary', description: 'Monthly Paycheck', amount: 3500.00, date: 'Oct 26' },
  { id: '3', type: 'expense', category: 'Dinner', description: 'Restaurant', amount: -25.50, date: 'Oct 25' },
];

// --- Komponen Individual ---

const SummaryCard = ({ title, value, color }) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={[styles.summaryValue, { color: color }]}>
      {value < 0 ? `-Rp${Math.abs(value).toFixed(2)}` : `Rp${value.toFixed(2)}`}
    </Text>
  </View>
);

const TransactionItem = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';
  const amountColor = isExpense ? '#E74C3C' : '#2ECC71';
  const iconName = isExpense ? 'arrowdown' : 'arrowup';

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <AntDesign name={iconName} size={20} color={isExpense ? '#E74C3C' : '#2ECC71'} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>
      <View style={styles.transactionAmountDate}>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {isExpense ? '' : '+'}Rp{transaction.amount.toFixed(2)}
        </Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
  );
};


// --- Layar Home Utama ---
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Header dan Saldo Total */}
        <View style={styles.headerContainer}>
          <Feather name="menu" size={24} color="white" />
          <Text style={styles.appName}>Financify</Text>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Saldo</Text>
          <Text style={styles.balanceValue}>Rp{totalBalance.toFixed(2)}</Text>
        </View>

        {/* 2. Ringkasan Keuangan */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Ringkasan Keuangan Bulan Ini</Text>
          <View style={styles.summaryCardsRow}>
            <SummaryCard title="Pemasukan" value={financialSummary.income} color="#2ECC71" />
            <SummaryCard title="Pengeluaran" value={financialSummary.expense} color="#E74C3C" />
            <SummaryCard title="Sisa Dana" value={financialSummary.remaining} color="#3498DB" />
          </View>
        </View>

        {/* 3. Transaksi Terbaru */}
        <View style={styles.recentTransactionsContainer}>
          <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
          <View style={styles.transactionsList}>
            {recentTransactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
             <Text style={styles.viewAllButtonText}>Lihat Semua Transaksi</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

      {/* 4. Tombol Aksi Cepat (FAB) */}
      <TouchableOpacity style={styles.fabButton} onPress={() => console.log('Tambah Transaksi')}>
        <AntDesign name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      
      {/* Catatan: Navigasi Tab Bawah (Bottom Tabs) biasanya diimplementasikan
          di komponen Navigator utama, bukan di sini. */}
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: {
    paddingBottom: 80, // Ruang untuk FAB dan Navigasi Bawah
  },
  
  // Header dan Saldo
  headerContainer: {
    backgroundColor: '#1E2B47', // Warna Aksen Gelap
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  appName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: '#1E2B47',
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  balanceLabel: {
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceValue: {
    color: '#2ECC71', // Hijau untuk Saldo
    fontSize: 36,
    fontWeight: 'bold',
  },

  // Ringkasan Keuangan
  summaryContainer: {
    padding: 20,
    marginTop: -20, // Tumpang tindih dengan balanceCard
    backgroundColor: '#F8F8F8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  summaryCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    width: '32%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Transaksi Terbaru
  recentTransactionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionIconContainer: {
    paddingRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDescription: {
    fontSize: 12,
    color: '#777',
  },
  transactionAmountDate: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  viewAllButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  viewAllButtonText: {
    color: '#3498DB',
    fontWeight: '600',
  },

  // FAB
  fabButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#3498DB', // Warna Aksen Biru
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
});