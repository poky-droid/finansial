import { dataType, editData, getData, hapusdata } from '@/lib/data';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Komponen Individual ---

const TransactionItem = ({ transaction, onRefresh }: { transaction: dataType; onRefresh: () => void }) => {
  const isExpense = transaction.jenisTransaksi === 'Pengeluaran';
  const amountColor = isExpense ? '#E74C3C' : '#2ECC71';
  const iconName = isExpense ? 'remove-circle-outline' : 'add-circle-outline';
  const [showActions, setShowActions] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editKategori, setEditKategori] = useState(transaction.kategori);
  const [editCatatan, setEditCatatan] = useState(transaction.catatan);
  const [editJumlah, setEditJumlah] = useState(transaction.jumlah.toString());
  const [editJenis, setEditJenis] = useState(transaction.jenisTransaksi);
  const [isSaving, setIsSaving] = useState(false);

  // Format angka ke Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const dateString = transaction.date 
    ? new Date(transaction.date).toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Tanpa tanggal';

  const handleDelete = () => {
    Alert.alert(
      'Hapus Transaksi',
      'Anda yakin ingin menghapus transaksi ini?',
      [
        { text: 'Batal', onPress: () => {}, style: 'cancel' },
        {
          text: 'Hapus',
          onPress: async () => {
            try {
              console.log('Menghapus transaksi dengan ID:', transaction.id_transaksi);
              await hapusdata(transaction.id_transaksi);
              setShowActions(false);
              await onRefresh();
              Alert.alert('Berhasil', 'Transaksi berhasil dihapus');
            } catch (error) {
              console.error('Error menghapus transaksi:', error);
              Alert.alert('Error', 'Gagal menghapus transaksi');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSaveEdit = async () => {
    if (!editKategori.trim() || !editCatatan.trim() || !editJumlah.trim()) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }

    const jumlah = parseFloat(editJumlah);
    if (isNaN(jumlah) || jumlah <= 0) {
      Alert.alert('Error', 'Jumlah harus berupa angka positif');
      return;
    }

    try {
      setIsSaving(true);
      await editData(
        transaction.id_transaksi,
        editJenis,
        editKategori,
        jumlah,
        editCatatan
      );
      onRefresh();
      setEditModalVisible(false);
      Alert.alert('Berhasil', 'Transaksi berhasil diperbarui');
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui transaksi');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.transactionItem} 
        activeOpacity={0.7}
        onLongPress={() => setShowActions(!showActions)}
      >
        <Ionicons name={iconName} size={28} color={amountColor} style={{ marginRight: 10 }} />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionCategory}>{transaction.kategori}</Text>
          <Text style={styles.transactionDescription}>{transaction.catatan}</Text>
        </View>
        <View style={styles.transactionAmountDate}>
          <Text style={[styles.transactionAmount, { color: amountColor }]}>
            {isExpense ? '-' : '+'}{formatRupiah(transaction.jumlah)}
          </Text>
          <Text style={styles.transactionDate}>{dateString}</Text>
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      {showActions && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => {
              setShowActions(false);
              setEditModalVisible(true);
            }}
          >
            <Ionicons name="pencil" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => {
              setShowActions(false);
              handleDelete();
            }}
          >
            <Ionicons name="trash" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Ionicons name="chevron-back" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Transaksi</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Jenis Transaksi */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Jenis Transaksi</Text>
              <View style={styles.jenisContainer}>
                {(['Pemasukan', 'Pengeluaran', 'Investasi'] as const).map((jenis) => (
                  <TouchableOpacity
                    key={jenis}
                    style={[
                      styles.jenisButton,
                      editJenis === jenis && styles.jenisButtonActive,
                    ]}
                    onPress={() => setEditJenis(jenis)}
                  >
                    <Text
                      style={[
                        styles.jenisButtonText,
                        editJenis === jenis && styles.jenisButtonTextActive,
                      ]}
                    >
                      {jenis}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Kategori */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Kategori</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan kategori"
                value={editKategori}
                onChangeText={setEditKategori}
              />
            </View>

            {/* Catatan */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Catatan</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan catatan"
                value={editCatatan}
                onChangeText={setEditCatatan}
              />
            </View>

            {/* Jumlah */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Jumlah</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan jumlah"
                value={editJumlah}
                onChangeText={setEditJumlah}
                keyboardType="decimal-pad"
              />
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSaveEdit}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

// --- Layar Transaksi Utama ---
export default function TransactionsScreen() {
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data saat component mount
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading transaksi...');
      const data = await getData();
      console.log('✅ Data transaksi berhasil dimuat:', data);
      console.log('Total transaksi:', data.length);
      setTransactions(data);
    } catch (error) {
      console.error('❌ Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Logika Filter (Sederhana)
  const filteredTransactions = transactions.filter((t: dataType) =>
    t.catatan.toLowerCase().includes(searchText.toLowerCase()) ||
    t.kategori.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerWithRefresh}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Riwayat Transaksi</Text>
        </View>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={loadTransactions}
        >
          <Ionicons name="refresh" size={24} color="#3498DB" />
        </TouchableOpacity>
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
        {loading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator size="large" color="#3498DB" />
          </View>
        ) : filteredTransactions.length > 0 ? (
          <View style={styles.transactionsList}>
            {filteredTransactions.map((item: dataType) => (
              <TransactionItem key={item.id_transaksi} transaction={item} onRefresh={loadTransactions} />
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
  headerWithRefresh: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  refreshButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
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

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#3498DB',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 14,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  jenisContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  jenisButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  jenisButtonActive: {
    backgroundColor: '#3498DB',
    borderColor: '#3498DB',
  },
  jenisButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  jenisButtonTextActive: {
    color: '#FFFFFF',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#3498DB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});