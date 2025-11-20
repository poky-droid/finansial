import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  visible: boolean;
  onClose: () => void;
}

export const DatePicker = ({ value, onChange, visible, onClose }: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(value || new Date()));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date: Date) => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const handleDayPress = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange(formatDate(newDate));
    onClose();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    const selectedDay = new Date(value || new Date()).getDate();
    const selectedMonth = new Date(value || new Date()).getMonth();
    const selectedYear = new Date(value || new Date()).getFullYear();

    return (
      <View>
        {/* Header dengan bulan dan tahun */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={handlePrevMonth}>
            <AntDesign name="left" size={20} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <AntDesign name="right" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Days header (M, S, S, R, K, J, S) */}
        <View style={styles.weekHeader}>
          {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              const isSelected = day &&
                selectedDay === day &&
                selectedMonth === currentDate.getMonth() &&
                selectedYear === currentDate.getFullYear();
              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={isSelected ? [styles.dayCell, styles.selectedDay] : styles.dayCell}
                  onPress={() => day && handleDayPress(day)}
                  disabled={!day}
                >
                  <Text
                    style={isSelected ? [styles.dayText, styles.selectedDayText] : styles.dayText}
                  >
                    {day || ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>

          {/* Selected date display */}
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateLabel}>
              {formatDisplayDate(currentDate)}
            </Text>
          </View>

          {/* Calendar */}
          {renderCalendar()}

          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>BATAL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.okButton]}
              onPress={() => {
                onChange(formatDate(currentDate));
                onClose();
              }}
            >
              <Text style={styles.okButtonText}>OKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  selectedDateContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  selectedDateLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    width: '14.28%',
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#CCC',
    fontWeight: '500',
  },
  selectedDay: {
    backgroundColor: '#4ECDC4',
  },
  selectedDayText: {
    color: '#333',
    fontWeight: '700',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelButtonText: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  okButton: {
    backgroundColor: '#4ECDC4',
  },
  okButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
