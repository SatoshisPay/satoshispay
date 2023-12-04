import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import RnDatePicker from 'react-native-date-picker';

type DateFix = 'start' | 'end';

interface Props {
  className?: string;
  date: Date | undefined;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  placeholder: string;
  fix?: DateFix;
}

const DatePicker = ({
  className,
  date,
  onChange,
  maximumDate,
  minimumDate,
  placeholder,
  fix,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onDateChanged = (pickedDate: Date) => {
    if (fix === 'start') {
      // set date at beginning of the day
      pickedDate.setHours(0, 0, 0, 0);
    }
    if (fix === 'end') {
      // set date at end of the day
      pickedDate.setHours(23, 59, 59, 999);
    }

    onChange(pickedDate);
  };

  const onDateConfirmed = (pickedDate: Date) => {
    setIsOpen(false);
    onDateChanged(pickedDate);
  };

  return (
    <View className={className}>
      <Text className="text-brandAlt">{placeholder}</Text>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="w-full border border-gray-300 bg-white p-4">
        <Text className="text-lg w-full">
          {date ? date.toLocaleDateString(['it']) : placeholder}
        </Text>
      </TouchableOpacity>
      <RnDatePicker
        modal
        open={isOpen}
        date={date ?? new Date()}
        onDateChange={onDateChanged}
        mode="date"
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        androidVariant="nativeAndroid"
        locale="it"
        theme="light"
        onCancel={() => setIsOpen(false)}
        onConfirm={onDateConfirmed}
      />
    </View>
  );
};

export default DatePicker;
