import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default function BackgroundChanger() {
  // Default background color aur history store karne ke liye state
  const [bgColor, setBgColor] = useState('#1E293B');
  const [textColor, setTextColor] = useState('#FFFFFF');

  // Random Hex Color generate karne ka function
  const generateRandomColor = () => {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexChars[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
    setTextColor('#FFFFFF');
  };

  // Kuch preset sundar colors ke liye function
  const setPresetColor = (bg: string, text: string) => {
    setBgColor(bg);
    setTextColor(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle={textColor === '#FFFFFF' ? 'light-content' : 'dark-content'} />

      {/* Current Color Code Card */}
      <View style={styles.card}>
        <Text style={styles.label}>CURRENT BACKGROUND COLOR</Text>
        <Text style={styles.hexText}>{bgColor}</Text>
      </View>

      {/* Main Random Color Button */}
      <TouchableOpacity style={styles.mainButton} onPress={generateRandomColor} activeOpacity={0.8}>
        <Text style={styles.mainButtonText}>🎨 Change Random Color</Text>
      </TouchableOpacity>

      {/* Preset Color Circles */}
      <View style={styles.presetRow}>
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#EF4444' }]}
          onPress={() => setPresetColor('#EF4444', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#10B981' }]}
          onPress={() => setPresetColor('#10B981', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#3B82F6' }]}
          onPress={() => setPresetColor('#3B82F6', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#F59E0B' }]}
          onPress={() => setPresetColor('#F59E0B', '#111827')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1' }]}
          onPress={() => setPresetColor('#F8FAFC', '#0F172A')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingVertical: 24,
    paddingHorizontal: 36,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  hexText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  mainButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 5,
    marginBottom: 30,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  presetRow: {
    flexDirection: 'row',
    gap: 14,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    elevation: 4,
  },
});