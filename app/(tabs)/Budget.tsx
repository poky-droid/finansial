import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Data Contoh (Simulasi data) ---
const BUDGET_DATA = [
  { id: '1', category: 'Makanan & Minuman', limit: 3000000, spent: 2800000, icon: 'fast-food' },
  { id: '2', category: 'Transportasi', limit: 1500000, spent: 850000, icon: 'car' },
  { id: '3', category: 'Hiburan', limit: 800000, spent: 950000, icon: 'game-controller' }, // Melebihi batas
  { id: '4', category: 'Tagihan', limit: 1000000, spent: 900000, icon: 'receipt' },
  { id: '5', category: 'Investasi', limit: 1000000, spent: 900000, icon: 'trending-up' },
];

const totalBudget = BUDGET_DATA.reduce((sum, item) => sum + item.limit, 0);
const totalSpent = BUDGET_DATA.reduce((sum, item) => sum + item.spent, 0);
const remaining = totalBudget - totalSpent;

// --- Komponen Individual ---

const ProgressBar = ({ percentage }) => {
  let barColor;

  if (percentage >= 100) {
    barColor = '#E74C3C'; // Merah: Melebihi batas
  } else if (percentage >= 80) {
    barColor = '#F39C12'; // Kuning: Hampir batas
  } else {
    barColor = '#2ECC71'; // Hijau: Aman
  }

  // Memastikan lebar tidak lebih dari 100%
  const width = Math.min(percentage, 100);

  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${width}%`, backgroundColor: barColor }]} />
    </View>
  );
};

const BudgetCategoryItem = ({ item }) => {
  const percentage = (item.spent / item.limit) * 100;
  
  // Format angka ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <TouchableOpacity style={styles.budgetItem} activeOpacity={0.7}>
      <View style={styles.budgetItemHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name={item.icon} size={24} color="#333" style={{ marginRight: 10 }} />
          <Text style={styles.categoryName}>{item.category}</Text>
        </View>
        <Text style={styles.percentageText}>
          {percentage.toFixed(0)}%
        </Text>
      </View>

      <ProgressBar percentage={percentage} />

      <View style={styles.budgetItemFooter}>
        <Text style={styles.spentText}>
          Terpakai: <Text style={{ fontWeight: 'bold', color: percentage > 100 ? '#E74C3C' : '#333' }}>{formatRupiah(item.spent)}</Text>
        </Text>
        <Text style={styles.limitText}>
          Batas: {formatRupiah(item.limit)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Layar Anggaran Utama ---
export default function BudgetScreen() {
  
  // Format angka ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(number));
  };
  
  const progressPercent = (totalSpent / totalBudget) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Anggaran Bulanan</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Tambah Anggaran')}>
          <Ionicons name="add" size={24} color="#3498DB" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>

        {/* Kartu Ringkasan Anggaran Utama */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Anggaran Bulan Ini</Text>
          <Text style={styles.totalBudgetValue}>{formatRupiah(totalBudget)}</Text>
          
          <Text style={styles.spentLabel}>Pengeluaran Total:</Text>
          <Text style={styles.spentValue}>{formatRupiah(totalSpent)}</Text>

          <ProgressBar percentage={progressPercent} />
          
          <Text style={styles.remainingText}>
            Sisa Dana: 
            <Text style={{ 
                fontWeight: 'bold', 
                color: remaining < 0 ? '#E74C3C' : '#2ECC71' 
            }}>
                {remaining < 0 ? ' (Overspent)' : ''} {formatRupiah(remaining)}
            </Text>
          </Text>
        </View>
        
        {/* Daftar Anggaran Berdasarkan Kategori */}
        <Text style={styles.sectionTitle}>Anggaran Per Kategori</Text>
        <View style={styles.budgetList}>
          {BUDGET_DATA.map(item => (
            <BudgetCategoryItem key={item.id} item={item} />
          ))}
        </View>

      </ScrollView>
      
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
    paddingTop: 10,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    borderRadius: 10,
  },
  addButton: {
    padding: 5,
  },

  // Kartu Ringkasan
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 14,
    color: '#777',
  },
  totalBudgetValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E2B47',
    marginBottom: 15,
  },
  spentLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  spentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C', // Merah untuk Pengeluaran
    marginBottom: 10,
  },
  remainingText: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },

  // Progress Bar
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },

  // Daftar Anggaran Kategori
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  budgetList: {
    marginBottom: 20,
  },
  budgetItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  budgetItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498DB',
  },
  budgetItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  spentText: {
    fontSize: 14,
    color: '#555',
  },
  limitText: {
    fontSize: 14,
    color: '#555',
  },
});