import * as Clipboard from 'expo-clipboard';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

export default function BackgroundChanger() {
  const [bgColor, setBgColor] = useState('#1E293B');
  const [prevColor, setPrevColor] = useState('#1E293B');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>(['#1E293B']);

  // Smooth transition ke liye animation value
  const colorAnim = useRef(new Animated.Value(1)).current;

  const triggerVibration = (duration = 60) => {
    if (Platform.OS === 'web') {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(duration);
      }
    } else {
      Vibration.cancel();
      Vibration.vibrate(duration);
    }
  };

  // Smooth fade ke saath color apply karne ka helper
  const applyColorChange = (newColor: string, newTextColor = '#FFFFFF') => {
    if (newColor === bgColor) return;
    triggerVibration(60);
    setPrevColor(bgColor);
    setBgColor(newColor);
    setTextColor(newTextColor);
    setCopied(false);

    // History mein latest 5 unique colors rakhein
    setHistory((prev) => [newColor, ...prev.filter((c) => c !== newColor)].slice(0, 5));

    colorAnim.setValue(0);
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Random Hex Color generate karne ka function
  const generateRandomColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }
    applyColorChange(color, '#FFFFFF');
  };

  // Hex Code Clipboard par Copy karne ka function
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(bgColor);
    triggerVibration(40);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const animatedBackground = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [prevColor, bgColor],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBackground }]}>
      <StatusBar barStyle={textColor === '#FFFFFF' ? 'light-content' : 'dark-content'} />

      {/* Current Color Code Card (Tap to Copy) */}
      <TouchableOpacity style={styles.card} onPress={copyToClipboard} activeOpacity={0.85}>
        <Text style={styles.label}>CURRENT BACKGROUND COLOR</Text>
        <Text style={styles.hexText}>{bgColor}</Text>
        <Text style={[styles.copyHint, copied && styles.copiedText]}>
          {copied ? '✓ Copied to clipboard!' : 'Tap card to copy HEX'}
        </Text>
      </TouchableOpacity>

      {/* Main Random Color Button */}
      <TouchableOpacity
        style={styles.mainButton}
        onPress={generateRandomColor}
        activeOpacity={0.8}
      >
        <Text style={styles.mainButtonText}>🎨 Change Random Color</Text>
      </TouchableOpacity>

      {/* Preset Color Circles */}
      <Text style={styles.sectionTitle}>PRESET COLORS</Text>
      <View style={styles.presetRow}>
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#EF4444' }]}
          onPress={() => applyColorChange('#EF4444', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#10B981' }]}
          onPress={() => applyColorChange('#10B981', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#3B82F6' }]}
          onPress={() => applyColorChange('#3B82F6', '#FFFFFF')}
        />
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: '#F59E0B' }]}
          onPress={() => applyColorChange('#F59E0B', '#111827')}
        />
        <TouchableOpacity
          style={[
            styles.circle,
            { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1' },
          ]}
          onPress={() => applyColorChange('#F8FAFC', '#0F172A')}
        />
      </View>

      {/* Recent Color History */}
      {history.length > 1 && (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>RECENT HISTORY</Text>
          <View style={styles.presetRow}>
            {history.map((itemColor) => (
              <TouchableOpacity
                key={itemColor}
                style={[styles.historyCircle, { backgroundColor: itemColor }]}
                onPress={() => applyColorChange(itemColor, '#FFFFFF')}
              />
            ))}
          </View>
        </View>
      )}
    </Animated.View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 24,
    paddingHorizontal: 36,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 36,
    elevation: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  hexText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  copyHint: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  copiedText: {
    color: '#10B981',
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    letterSpacing: 1,
    marginBottom: 12,
    overflow: 'hidden',
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
  historyContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  historyCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
});