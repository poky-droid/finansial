import Ionicons from '@expo/vector-icons/Ionicons'; // Contoh
import { Tabs } from 'expo-router';
import React from 'react';
// ...

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
       tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />, headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
         tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          
        }}
      />
      <Tabs.Screen
        name="Transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={28} color={color} />,
         }}
      />
      <Tabs.Screen
        name="Budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
