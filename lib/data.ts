import { load, save } from "./storage";

export type jenisTransaksi = 'Pemasukan' | 'Pengeluaran' | 'Investasi';
export interface dataType{
    id_transaksi : number;
    jenisTransaksi: jenisTransaksi;
    kategori: string;
    jumlah: number;
    catatan: string;
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
  catatan: string
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
  };
  existingData.push(newData);
  await save(storageKey, existingData);
  return existingData;
}


export async function hapusdata(id_transaksi: number) {
  const existingData = await getData();
  const filteredData = existingData.filter(d => d.id_transaksi !== id_transaksi);
  await save(storageKey, filteredData);
  return filteredData;
}

export async function editData(
  id_transaksi: number, 
  jenisTransaksi: jenisTransaksi, 
  kategori: string, 
  jumlah: number, 
  catatan: string
) {
  if (jumlah < 0) throw new Error("Jumlah tidak boleh negatif");
  if (!["Pemasukan", "Pengeluaran", "Investasi"].includes(jenisTransaksi)) {
    throw new Error("Jenis transaksi tidak valid");
  }

  const existingData = await getData();
  const index = existingData.findIndex(d => d.id_transaksi === id_transaksi);
  if (index !== -1) {
    existingData[index] = {
      id_transaksi: existingData[index].id_transaksi,
      jenisTransaksi,
      kategori,
      jumlah,
      catatan,
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








