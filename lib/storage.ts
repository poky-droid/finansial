import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'dana_app_storage';

// Simpan data ke AsyncStorage
export async function save(key: string, value: any) {
  try {
    const jsonString = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonString);
    console.log('Data berhasil disimpan ke storage:', key);
  } catch (error) {
    console.error('Error menyimpan data:', error);
    throw error;
  }
}

// Ambil data dari AsyncStorage
export async function load(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    console.log('Data dari storage:', data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error membaca data:', error);
    throw error;
  }
}

// Hapus data
export async function remove(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data berhasil dihapus dari storage:', key);
  } catch (error) {
    console.error('Error menghapus data:', error);
    throw error;
  }
}

