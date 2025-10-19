
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
export default function HomeScreen() {
  return (
     <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* navbar */}
      <View style={styles.navbar}>
        <View style={styles.Saldo} >
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
          <Text style={{ color: 'white' }}>total Saldo Anda</Text>
        </View>
        <View style={styles.kontainerisi}>
          <View style={styles.isi}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
            <Text style={{ color: 'white' }}>Pendapatan</Text>
          </View>
          <View style={styles.isi}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Rp 100.000</Text>
            <Text style={{ color: 'white' }}>Pengeluaran</Text>
          </View>
          <View style={styles.isi}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
            <Text style={{ color: 'white' }}>investasi</Text>
          </View>
        </View>
        {/* akhir navbar */}

        {/* buton tambah transaksi */}
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Tambah Transaksi</Text>
          <Button title="Tambah" onPress={() => {}} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Isi konten di sini</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  navbar: {
    height: '30%',
    width: '100%',
    backgroundColor: '#85f185ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderRadius: 10,
    paddingTop: 15,
    gap: 30,
  },
  Saldo: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  kontainerisi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  isi: {
    alignItems: 'center',
    justifyContent: 'center',

  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
