import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Data Contoh (Simulasi data) ---
const ALL_TRANSACTIONS = [
  { id: '1', type: 'expense', category: 'Makanan & Minuman', description: 'Makan siang kantor', amount: -65000, date: '22 Okt 2025' },
  { id: '2', type: 'income', category: 'Gaji', description: 'Gaji Bulanan', amount: 8500000, date: '21 Okt 2025' },
  { id: '3', type: 'expense', category: 'Transportasi', description: 'Bensin Motor', amount: -30000, date: '21 Okt 2025' },
  { id: '4', type: 'expense', category: 'Tagihan', description: 'Bayar Listrik', amount: -250000, date: '20 Okt 2025' },
  { id: '5', type: 'expense', category: 'Hiburan', description: 'Tiket Bioskop', amount: -55000, date: '19 Okt 2025' },
];

// --- Komponen Individual ---

const TransactionItem = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';
  const amountColor = isExpense ? '#E74C3C' : '#2ECC71';
  const iconName = isExpense ? 'remove-circle-outline' : 'add-circle-outline';

  // Format angka ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(number));
  };

  return (
    <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
      <Ionicons name={iconName} size={28} color={amountColor} style={{ marginRight: 10 }} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>
      <View style={styles.transactionAmountDate}>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {isExpense ? '-' : '+'}{formatRupiah(transaction.amount)}
        </Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Layar Transaksi Utama ---
export default function TransactionsScreen() {
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false); // State untuk filter

  // Logika Filter (Sederhana)
  const filteredTransactions = ALL_TRANSACTIONS.filter(t =>
    t.description.toLowerCase().includes(searchText.toLowerCase()) ||
    t.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Riwayat Transaksi</Text>
      </View>

      {/* Bar Pencarian dan Filter */}
      <View style={styles.searchFilterBar}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#777" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari deskripsi atau kategori..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <MaterialIcons name="filter-list" size={24} color="#3498DB" />
        </TouchableOpacity>
      </View>
      
      {/* Daftar Transaksi */}
      <ScrollView style={styles.container}>
        {filteredTransactions.length > 0 ? (
          <View style={styles.transactionsList}>
            {filteredTransactions.map(item => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Tidak ada transaksi yang cocok.</Text>
            <Text style={styles.emptySubText}>Coba ubah kata kunci pencarian Anda.</Text>
          </View>
        )}
      </ScrollView>

      {/* Tombol FAB untuk Tambah Transaksi (Seperti di Home) */}
      <TouchableOpacity style={styles.fabButton} onPress={() => console.log('Buka form tambah transaksi')}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      
      {/* Catatan: Modal Filter (Modal untuk setFilterModalVisible) akan diimplementasikan secara terpisah */}
    </SafeAreaView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },

  // Search and Filter Bar
  searchFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  // Transaksi List
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#777',
  },
  emptySubText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },
  
  // FAB (Tombol Tambah)
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