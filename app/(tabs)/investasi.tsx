import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function InvestmentTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      
      {/* 1. SAHAM (Stock/Equity) */}
      <Tabs.Screen
        name="Saham" // Pastikan ada file Saham.tsx di folder yang sama
        options={{
          title: 'Saham',
          // Ikon yang umum untuk pasar saham: grafik/grafik garis naik
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trending-up" color={color} />, 
        }}
      />
      
      {/* 2. OBLIGASI (Bond/Fixed Income) */}
      <Tabs.Screen
        name="Obligasi" // Pastikan ada file Obligasi.tsx
        options={{
          title: 'Obligasi',
          // Ikon yang umum untuk dokumen/sertifikat/keuangan
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="file-text-o" color={color} />, 
        }}
      />
      
      {/* 3. CRYPTO (Cryptocurrency) */}
      <Tabs.Screen
        name="Crypto" // Pastikan ada file Crypto.tsx
        options={{
          title: 'Crypto',
          // Ikon yang umum untuk mata uang/koin/blockchain
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bitcoin" color={color} />, 
        }}
      />
      
      {/* 4. REKSADANA (Mutual Fund) */}
      <Tabs.Screen
        name="Reksadana" // Pastikan ada file Reksadana.tsx
        options={{
          title: 'Reksadana',
          // Ikon yang umum untuk keranjang/dana yang dikumpulkan
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pie-chart" color={color} />, 
        }}
      />
    </Tabs>
  );
}

// Catatan: Ikon di atas menggunakan konvensi nama umum dari FontAwesome atau sejenisnya.