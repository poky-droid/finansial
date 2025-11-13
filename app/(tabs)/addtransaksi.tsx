
// import React, { useState } from 'react';
// import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

// interface AddDataModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSave: (data: { name: string; amount: string }) => void;
// }

// const AddDataModal = ({ visible, onClose, onSave }: AddDataModalProps) => {
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleSave = () => {
//     if (!name || !amount) return alert('Isi semua field!');
//     onSave({ name, amount });
//     setName('');
//     setAmount('');
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Tambah Data</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Nama"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Jumlah"
//             keyboardType="numeric"
//             value={amount}
//             onChangeText={setAmount}
//           />

//           <View style={styles.buttonRow}>
//             <Button title="Batal" onPress={onClose} />
//             <Button title="Simpan" onPress={handleSave} />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   container: {
//     width: 300,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default AddDataModal;
