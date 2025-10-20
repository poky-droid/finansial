
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
            <Text style={{ color:'#f2f6f2ff' }}>Investasi</Text>
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
           <TouchableOpacity style={styles.TambahButton} onPress={() => {}}>
             <Text style={styles.buttonText}>+ Tambah Transaksi</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
             <Text style={styles.buttonText}>filter Transaksi</Text>
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
    backgroundColor: '#00BFA6',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',    
    padding: 10,
    backgroundColor: '#f2f6f2ff',
    borderRadius: 20,
    overflow: 'hidden',
    gap: 10,
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
    TambahButton: {
      backgroundColor:'#00BFA6',
      width: '100%',              // lebar penuh container
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    filterButton: {
      backgroundColor: '#f9f9f9',
      width: '100%',              // lebar penuh container
      paddingVertical: 12,
      height: 45,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
  });
