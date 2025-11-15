import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// --- FUNGSI FORMATTING ---
function formatRupiah(amount: number): string {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat('id-ID', options);
  return formatter.format(amount);
}

// --- DATA CONTOH ---
const totalBalance = 12450.75;
const financialSummary = {
  income: 5200.00,
  expense: 2750.00,
  remaining: 2450.75,
};
const recentTransactions = [
  { id: '1', type: 'expense' as const, category: 'Groceries', description: 'Supermarket', amount: -50.00, date: 'Oct 26' },
  { id: '2', type: 'income' as const, category: 'Salary', description: 'Monthly Paycheck', amount: 3500.00, date: 'Oct 26' },
  { id: '3', type: 'expense' as const, category: 'Dinner', description: 'Restaurant', amount: -25.50, date: 'Oct 25' },
];

// --- DATA TERFORMAT (Siap Render) ---
const formattedTotalBalance = formatRupiah(totalBalance);

const formattedSummary = {  
  income: formatRupiah(financialSummary.income),
  expense: formatRupiah(financialSummary.expense),
  remaining: formatRupiah(financialSummary.remaining),
};

const formattedTransactions = recentTransactions.map(transaction => {
  // Gunakan Math.abs() sebelum memformat (misalnya Rp50,00, bukan Rp-50,00)
  const formattedAmount = formatRupiah(Math.abs(transaction.amount));
  
  // Menggabungkan data mentah dan data yang sudah diformat
  return {
    ...transaction,
    // amount_formatted: menyimpan string Rp12.450,75
    amount_formatted: formattedAmount, 
    // amount: menyimpan angka mentah -50.00
  };
});

// --- Komponen Individual (DIPERBAIKI) ---

interface SummaryCardProps {
  title: string;
  value: number;
  formattedValue: string;
  color: string;
}

const SummaryCard = ({ title, value, formattedValue, color }: SummaryCardProps) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIconBg, { backgroundColor: `${color}20` }]}>
      <AntDesign name={title === 'Pemasukan' ? 'arrow-up' : title === 'Pengeluaran' ? 'arrow-down' : 'line-chart'} 
                  size={24} color={color} />
    </View>
    <Text style={styles.summaryTitle}>{title}</Text>
    {/* Menggunakan formattedValue yang sudah berupa string Rupiah */}
    <Text style={[styles.summaryValue, { color: color }]}>
      {formattedValue}
    </Text>
  </View>
);

interface Transaction {
  id: string;
  type: 'expense' | 'income';
  category: string;
  description: string;
  amount: number;
  amount_formatted?: string;
  date: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isExpense = transaction.type === 'expense';
  const amountColor = isExpense ? '#E74C3C' : '#2ECC71';
  const iconName = isExpense ? 'arrow-down' : 'arrow-up';
  const bgColor = isExpense ? '#E74C3C15' : '#2ECC7115';
  const badgeBg = isExpense ? '#E74C3C10' : '#2ECC7110';

  // Ambil string Rupiah yang sudah diformat
  const displayAmount = transaction.amount_formatted || ''; 
  
  return (
    <View style={styles.transactionItem}>
      <View style={[styles.transactionIconContainer, { backgroundColor: badgeBg }]}>
        <AntDesign name={iconName as any} size={20} color={amountColor} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
      </View>
      <View style={styles.transactionAmountDate}>
        {/* Tanda +/- ditambahkan di sini secara manual untuk tampilan */}
        <View style={[styles.amountBadge, { backgroundColor: `${amountColor}15` }]}>
          <Text style={[styles.transactionAmount, { color: amountColor }]}>
            {isExpense ? '-' : '+'}
            {displayAmount.replace('Rp', '')} 
          </Text>
        </View>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
  );
};

// --- Tipe Transaksi Options ---
const TRANSACTION_TYPES = [
  { value: 'pemasukan', label: 'Pemasukan', icon: 'arrow-up', color: '#2ECC71' },
  { value: 'pengeluaran', label: 'Pengeluaran', icon: 'arrow-down', color: '#E74C3C' },
  { value: 'investasi', label: 'Investasi', icon: 'line-chart', color: '#F39C12' },
] as const;

// --- Komponen Modal Tambah Transaksi ---
interface AddDataModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { name: string; amount: string }) => void;
}

const AddDataModal = ({ visible, onClose, onSave }: AddDataModalProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [jenisTransaksi, setJenisTransaksi] = useState('');

  const handleSave = () => {
    if (!name || !amount || !jenisTransaksi) return alert('Isi semua field!');
    onSave({ name, amount });
    setName('');
    setAmount('');
    setJenisTransaksi('');
    onClose();
  };

  const getTransactionIcon = (type: string) => {
    const typeData = TRANSACTION_TYPES.find(t => t.value === type);
    return typeData?.icon || 'plus';
  };

  const getTransactionColor = (type: string) => {
    const typeData = TRANSACTION_TYPES.find(t => t.value === type);
    return typeData?.color || '#3498DB';
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="#666" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={[styles.iconBg, { backgroundColor: `${getTransactionColor(jenisTransaksi)}20` }]}>
              <AntDesign 
                name={getTransactionIcon(jenisTransaksi) as any} 
                size={32} 
                color={getTransactionColor(jenisTransaksi)} 
              />
            </View>
            <Text style={styles.modalTitle}>Tambah Transaksi</Text>
            <Text style={styles.modalSubtitle}>Catat transaksi finansial Anda</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Jenis Transaksi */}
            <Text style={styles.label}>Jenis Transaksi</Text>
            <View style={styles.transactionTypeContainer}>
              {TRANSACTION_TYPES.map((type) => {
                const isActive = jenisTransaksi === type.value;
                return (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.transactionTypeButton,
                      isActive && styles.transactionTypeButtonActive,
                      isActive && { backgroundColor: `${type.color}20`, borderColor: type.color }
                    ]}
                    onPress={() => setJenisTransaksi(type.value)}
                  >
                    <AntDesign 
                      name={type.icon as any} 
                      size={24} 
                      color={isActive ? type.color : '#999'} 
                    />
                    <Text style={[
                      styles.transactionTypeText,
                      isActive && { color: type.color, fontWeight: '700' }
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Keterangan */}
            <Text style={styles.label}>Keterangan</Text>
            <View style={styles.inputWrapper}>
              <AntDesign name="tags" size={18} color="#999" />
              <TextInput
                style={styles.inputField}
                placeholder="Masukkan keterangan transaksi"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#BBB"
              />
            </View>
            <Text style={styles.label}>Jenis Transaksi</Text>
            <View style={styles.inputWrapper}>
              <AntDesign name="tags" size={18} color="#999" />
              <TextInput
                style={styles.inputField}
                placeholder="Masukkan jenis transaksi"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#BBB"
              />
            </View>
            

            {/* Jumlah */}
            <Text style={styles.label}>Jumlah</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.currencySymbol}>Rp</Text>
              <TextInput
                style={styles.inputField}
                placeholder="0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="#BBB"
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.saveButton, { backgroundColor: getTransactionColor(jenisTransaksi) || '#3498DB' }]} 
              onPress={handleSave}
            >
              <AntDesign name="check" size={18} color="white" />
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


// --- Layar Home Utama (DIPERBAIKI) ---
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

    const handleAddTransaction = (data: { name: string; amount: string }) => {
      console.log('Transaksi baru ditambahkan:', data);
      // TODO: Simpan data transaksi ke state atau storage
      setModalVisible(false);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 1. Header dan Saldo Total */}
        <View style={styles.headerContainer}>
          <Feather name="menu" size={24} color="white" />
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Saldo</Text>
          {/* Menggunakan formattedTotalBalance */}
          <Text style={styles.balanceValue}>{formattedTotalBalance}</Text>
        </View>

        {/* 2. Ringkasan Keuangan */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Ringkasan Keuangan Bulan Ini</Text>
          <View style={styles.summaryCardsRow}>
            {/* Menggunakan formattedSummary */}
            <SummaryCard 
              title="Pemasukan" 
              value={financialSummary.income} 
              formattedValue={formattedSummary.income} 
              color="#2ECC71" 
            />
            <SummaryCard 
              title="Pengeluaran" 
              value={financialSummary.expense} 
              formattedValue={formattedSummary.expense} 
              color="#E74C3C" 
            />
            <SummaryCard 
              title="Sisa Dana" 
              value={financialSummary.remaining} 
              formattedValue={formattedSummary.remaining} 
              color="#3498DB" 
            />
          </View>
        </View>

        {/* 3. Transaksi Terbaru */}
        <View style={styles.recentTransactionsContainer}>
          <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
          <View style={styles.transactionsList}>
            {/* Menggunakan formattedTransactions */}
            {formattedTransactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Lihat Semua Transaksi</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

      {/* 4. Tombol Aksi Cepat (FAB) */}
      <TouchableOpacity style={styles.fabButton} onPress={() => setModalVisible(true)} >
        <AntDesign name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>

        {/* 5. Modal Tambah Transaksi */}
        <AddDataModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleAddTransaction}
        />
    </SafeAreaView>
  );
}

// --- Picker Select Styles ---
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 15,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: 12,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#F8FAFF',
    paddingRight: 40,
  },
  inputAndroid: {
    fontSize: 15,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: 12,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#F8FAFF',
    paddingRight: 40,
  },
  iconContainer: {
    top: 18,
    right: 12,
  },
  viewContainer: {
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: 12,
    backgroundColor: '#F8FAFF',
  },
};

// --- StyleSheet (Tidak ada perubahan pada styling) ---
const styles = StyleSheet.create({
  // ... (Gaya-gaya Anda yang tidak berubah)
  container: {
    paddingBottom: 100, 
  },
  headerContainer: {
    backgroundColor: '#1E2B47', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  balanceCard: {
    backgroundColor: '#1E2B47',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  balanceLabel: {
    color: '#B0BEC5',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceValue: { // Gaya ini sekarang menampilkan string Rupiah yang sudah diformat
    color: '#4CAF50',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#F8F8F8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2B47',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  summaryCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    width: '32%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIconBg: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  summaryValue: { // Gaya ini sekarang menampilkan string Rupiah yang sudah diformat
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentTransactionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  transactionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  transactionIconContainer: {
    paddingRight: 12,
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 4,
  },
  transactionCategory: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2B47',
    marginBottom: 3,
  },
  transactionDescription: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
  },
  transactionAmountDate: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  amountBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  viewAllButton: {
    marginTop: 18,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  viewAllButtonText: {
    color: '#3498DB',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  fabButton: {
    position: 'absolute',
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    backgroundColor: '#3498DB', 
    borderRadius: 32.5,
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 20,
      color: '#1E2B47',
      textAlign: 'center',
    },
    input: {
      borderWidth: 1.5,
      borderColor: '#E0E7FF',
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 13,
      marginBottom: 14,
      fontSize: 15,
      color: '#333',
      backgroundColor: '#F8FAFF',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 12,
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    modalHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    iconBg: {
      width: 60,
      height: 60,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    modalSubtitle: {
      fontSize: 14,
      color: '#888',
      marginTop: 8,
    },
    divider: {
      height: 1,
      backgroundColor: '#E0E0E0',
      marginBottom: 20,
    },
    formContainer: {
      marginBottom: 28,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: '#1E2B47',
      marginBottom: 12,
      letterSpacing: 0.3,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: '#E0E7FF',
      borderRadius: 12,
      paddingHorizontal: 14,
      marginBottom: 16,
      backgroundColor: '#F8FAFF',
      height: 50,
    },
    inputField: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
      color: '#333',
    },
    currencySymbol: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1E2B47',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
    },
    actionButton: {
      flex: 1,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    cancelButton: {
      backgroundColor: '#F0F0F0',
      borderWidth: 1.5,
      borderColor: '#E0E0E0',
    },
    cancelButtonText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#666',
    },
    saveButton: {
      backgroundColor: '#3498DB',
      shadowColor: '#3498DB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    saveButtonText: {
      fontSize: 15,
      fontWeight: '700',
      color: 'white',
    },
    transactionTypeContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 22,
    },
    transactionTypeButton: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 10,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#E8E8E8',
      backgroundColor: '#FAFAFA',
      gap: 8,
    },
    transactionTypeButtonActive: {
      borderWidth: 2.5,
    },
    transactionTypeText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
    },
});