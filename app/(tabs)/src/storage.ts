import AsyncStorage from '@react-native-async-storage/async-storage';



const STORAGE_KEY = 'dana_app_storage';


// Simpan data ke AsyncStorage
export async function save(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// Ambil data dari AsyncStorage
export async function load(key: string) {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Hapus data
export async function remove(key: string) {
  await AsyncStorage.removeItem(key);
}

