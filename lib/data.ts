import { load, save } from "./storage";

export type jenisTransaksi = 'Pemasukan' | 'Pengeluaran' | 'Investasi';
export interface dataType{
    id_transaksi : number;
    jenisTransaksi: jenisTransaksi;
    kategori: string;
    jumlah: number;
    catatan: string;
    date: string;
}

export interface summaryType{
    totalSaldo: number;
    totalPemasukan: number;
    totalPengeluaran: number;
    totalInvestasi: number;
}

const storageKey = 'dana_app_storage';

export async function getData(): Promise<dataType[]> {
  return (await load(storageKey)) || [];
}

async function generateID(): Promise<number> {
  const existingData = await getData();
  if (existingData.length === 0) return 1;
  
  // Cari ID tertinggi di data
  const maxID = Math.max(...existingData.map(d => d.id_transaksi));
  return maxID + 1;
}


export async function addData(
  jenisTransaksi: jenisTransaksi, 
  kategori: string, 
  jumlah: number, 
  catatan: string,
  date?: string
) {
  if (jumlah < 0) throw new Error("Jumlah tidak boleh negatif");
  if (!["Pemasukan", "Pengeluaran", "Investasi"].includes(jenisTransaksi)) {
    throw new Error("Jenis transaksi tidak valid");
  }
  const existingData = await getData();
  const newData: dataType = {
    id_transaksi: await generateID(),
    jenisTransaksi,
    kategori,
    jumlah,
    catatan,
    date: date || new Date().toISOString().split('T')[0],
  };
  existingData.push(newData);
  await save(storageKey, existingData);
  return existingData;
}


export async function hapusdata(id_transaksi: number) {
  try {
    console.log('=== MULAI HAPUS DATA ===');
    console.log('ID yang akan dihapus:', id_transaksi);
    
    const existingData = await getData();
    console.log('Total data sebelum hapus:', existingData.length);
    console.log('Data sebelum hapus:', existingData);
    
    const filteredData = existingData.filter(d => d.id_transaksi !== id_transaksi);
    console.log('Total data setelah filter:', filteredData.length);
    console.log('Data setelah filter:', filteredData);
    
    if (existingData.length === filteredData.length) {
      console.warn('⚠️  DATA TIDAK BERUBAH - ID tidak ditemukan?');
    }
    
    // Simpan langsung ke storage
    await save(storageKey, filteredData);
    console.log('✅ Data berhasil disimpan ke storage');
    
    // Verifikasi data yang disimpan
    const verifyData = await getData();
    console.log('Verifikasi data setelah hapus:', verifyData);
    console.log('=== SELESAI HAPUS DATA ===\n');
    
    return filteredData;
  } catch (error) {
    console.error('❌ Error dalam hapusdata:', error);
    throw error;
  }
}

export async function editData(
  id_transaksi: number, 
  jenisTransaksi: jenisTransaksi, 
  kategori: string, 
  jumlah: number, 
  catatan: string,
  date?: string
) {
  if (jumlah < 0) throw new Error("Jumlah tidak boleh negatif");
  if (!["Pemasukan", "Pengeluaran", "Investasi"].includes(jenisTransaksi)) {
    throw new Error("Jenis transaksi tidak valid");
  }

  const existingData = await getData();
  const index = existingData.findIndex(d => d.id_transaksi === id_transaksi);
  if (index !== -1) {
    existingData[index] = {
      ...existingData[index],
      jenisTransaksi,
      kategori,
      jumlah,
      catatan,
      date: date || existingData[index].date,
    };
    await save(storageKey, existingData);
  }
  return existingData;
}


export async function saldo(): Promise<number> {
    const existingData = await getData();
    let totalSaldo = 0;
    existingData.forEach((d) => {
        if (d.jenisTransaksi === 'Pemasukan') {
            totalSaldo += d.jumlah;
        } else if (d.jenisTransaksi === 'Pengeluaran') {
            totalSaldo -= d.jumlah;
        }else if (d.jenisTransaksi === 'Investasi') {
            totalSaldo -= d.jumlah;
        }
    });
    return totalSaldo;
}

export async function pemasukan(): Promise<number> {
    const existingData = await getData();
    let totalPemasukan = 0;
    existingData.forEach((d) => {
        if (d.jenisTransaksi === 'Pemasukan') {
            totalPemasukan += d.jumlah;
        }
    });
    return totalPemasukan;
}

export async function pengeluaran(): Promise<number> {
    const existingData = await getData();
    let totalPengeluaran = 0;
    existingData.forEach((d) => {
        if (d.jenisTransaksi === 'Pengeluaran') {
            totalPengeluaran += d.jumlah;
        }
    });
    return totalPengeluaran;
}

export async function investasi(): Promise<number> {
    const existingData = await getData();
    let totalInvestasi = 0;
    existingData.forEach((d) => {
        if (d.jenisTransaksi === 'Investasi') {
            totalInvestasi += d.jumlah;
        }
    });
    return totalInvestasi;
}

export async function getSummary(): Promise<summaryType> {
    const totalSaldo = await saldo();
    const totalPemasukan = await pemasukan();
    const totalPengeluaran = await pengeluaran();
    const totalInvestasi = await investasi();
    
    return {
        totalSaldo,
        totalPemasukan,
        totalPengeluaran,
        totalInvestasi,
    };
}








