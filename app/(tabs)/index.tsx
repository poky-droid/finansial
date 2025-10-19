
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function HomeScreen() {
  return (
     <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* navbar */}
      <View style={styles.navbar}>
        <View style={styles.Saldo} >
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
          <Text style={{ color: '#f2f6f2ff' }}>total Saldo Anda</Text>
        </View>
        <View style={styles.kontainerisi}>
          <View style={styles.isi}>
              <Text style={{ color: '#f2f6f2ff' }}>Pendapatan</Text>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
          
          </View>
           <View style={styles.isi}>
            <Text style={{ color:'#f2f6f2ff' }}>investasi</Text>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white' }}>Rp 100.000</Text>
          </View>
          <View style={styles.isi}>
            <Text style={{ color: '#f2f6f2ff' }}>Pengeluaran</Text>
            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'red' }}>Rp 100.000</Text>
          </View>
         
        </View>
        {/* akhir navbar */}

       
      </View>

      <View style={styles.container}>
         {/* buton tambah transaksi */}
        <View style={styles.buttonContainer}>
           <TouchableOpacity style={styles.fullButton} onPress={() => {}}>
          <Text style={styles.buttonText}>+ Tambah Transaksi</Text>
        </TouchableOpacity>
         </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
 
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
    borderRadius: 20,
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
    width: '80%',    
    padding: 10,
    backgroundColor: '#f2f6f2ff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'black',
  },
   container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
  },
    fullButton: {
      backgroundColor:'#85f185ff', // hijau
      width: '100%',              // lebar penuh container
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
  });
