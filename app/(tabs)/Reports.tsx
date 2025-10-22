import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Anggap Anda menggunakan library chart seperti 'react-native-chart-kit'
// atau 'victory-native' di lingkungan nyata.
// Untuk demonstrasi ini, kita akan menggunakan placeholder sederhana.
// import { LineChart, PieChart } from 'react-native-chart-kit'; 

// Mendapatkan lebar layar untuk penyesuaian grafik
const screenWidth = Dimensions.get('window').width;

// --- Data Contoh (Simulasi) ---
const monthlyData = {
  labels: ["Jul", "Agu", "Sep", "Okt"],
  income: [4000, 4500, 5200, 4800],
  expenses: [2500, 3000, 2750, 3200],
};

const pieChartData = [
  { name: 'Makanan', percentage: 35, color: '#E74C3C', legendFontColor: '#7F7F7F', legendFontSize: 14 },
  { name: 'Tagihan', percentage: 25, color: '#3498DB', legendFontColor: '#7F7F7F', legendFontSize: 14 },
  { name: 'Transportasi', percentage: 15, color: '#F1C40F', legendFontColor: '#7F7F7F', legendFontSize: 14 },
  { name: 'ivestasi', percentage: 25, color: '#9B59B6', legendFontColor: '#7F7F7F', legendFontSize: 14 },
];

// --- Komponen Grafik Placeholder ---
const ChartPlaceholder = ({ title, height }) => (
  <View style={[styles.chartContainer, { height }]}>
    <Text style={styles.chartTitle}>{title}</Text>
    <View style={styles.placeholderBox}>
      <Text style={styles.placeholderText}>Area Grafik (Line/Pie Chart)</Text>
    </View>
  </View>
);

// --- Layar Laporan Utama ---
export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('Bulanan');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        {/* Header dan Pilihan Periode */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Laporan Keuangan</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={24} color="#3498DB" />
            <Text style={styles.exportText}>Ekspor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.periodSelector}>
          {['Mingguan', 'Bulanan', 'Tahunan'].map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 1. Grafik Tren Pendapatan vs Pengeluaran */}
        <ChartPlaceholder 
          title={`Tren Pemasukan vs Pengeluaran (${selectedPeriod})`}
          height={200}
        />
        
        {/* 2. Distribusi Pengeluaran (Pie Chart) */}
        <ChartPlaceholder 
          title="Distribusi Pengeluaran Berdasarkan Kategori"
          height={250}
        />
        
        {/* 3. Laporan Kategori Teratas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5 Kategori Pengeluaran Terbesar</Text>
          {pieChartData.slice(0, 5).map((item, index) => (
            <View key={item.name} style={styles.categoryItem}>
              <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
              <Text style={styles.categoryName}>{index + 1}. {item.name}</Text>
              <Text style={styles.categoryAmount}>{item.percentage}%</Text>
            </View>
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
    padding: 20,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  exportText: {
    color: '#3498DB',
    marginLeft: 5,
    fontWeight: '600',
  },

  // Selektor Periode
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    color: '#777',
  },
  periodTextActive: {
    fontWeight: 'bold',
    color: '#333',
  },

  // Grafik Placeholder
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  placeholderBox: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%', // Mengisi sisa ruang chartContainer
  },
  placeholderText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
  },

  // Laporan Kategori Teratas
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});