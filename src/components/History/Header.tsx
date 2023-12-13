import React from 'react';
import { Text, View } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { Download } from 'react-native-feather';

import DatePicker from '../reusable/DatePicker';
import Button from '../reusable/Button';
import { getAllOrdersByDate } from '../../database/database';
import ErrorModal from '../shared/ErrorModal';
import SuccessModal from '../shared/SuccessModal';
import { isAndroid } from '../../utils/device';

interface Props {
  startDate?: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const Header = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);
  const [processingCsv, setProcessingCsv] = React.useState(false);

  const onDownloadCsv = () => {
    setProcessingCsv(true);
    // get orders from startDate to endDate
    downloadOrderCsv(startDate, endDate)
      .then(path => {
        setProcessingCsv(false);
        setError(undefined);
        setSuccess(
          `Transazioni scritte con successo in "${path}", nella cartella download`,
        );
      })
      .catch(e => {
        setError(e.message);
        setProcessingCsv(false);
      });
  };

  const btnDisabled = !startDate || !endDate || processingCsv;

  return (
    <View className="flex flex-row justify-around items-end w-full py-4">
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      {success && (
        <SuccessModal message={success} onClick={() => setSuccess(undefined)} />
      )}
      <View className="mx-2">
        <DatePicker
          className="w-1/2 mx-4"
          date={startDate}
          onChange={onStartDateChange}
          maximumDate={endDate ?? new Date()}
          placeholder="Data inizio"
          fix="start"
        />
      </View>
      <View>
        <DatePicker
          className="w-1/2 mx-4"
          date={endDate}
          onChange={onEndDateChange}
          maximumDate={new Date()}
          minimumDate={startDate}
          placeholder="Data fine"
          fix="end"
        />
      </View>
      <View className="mx-2 flex-1">
        <Button.Secondary onPress={onDownloadCsv} disabled={btnDisabled}>
          <Text className="text-brandAlt">Scarica CSV</Text>
          <Download className="text-brandAlt ml-2" />
        </Button.Secondary>
      </View>
    </View>
  );
};

const downloadOrderCsv = async (
  startDate: Date | undefined,
  endDate: Date,
): Promise<string> => {
  const fixedStartDate = startDate ?? new Date(0);
  const orders = await getAllOrdersByDate(fixedStartDate, endDate);

  // write csv
  const now = new Date();
  const fileName = `orders_${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}.csv`;
  const filePath = `${fileDirectory()}/${fileName}`;

  await RNFS.writeFile(
    filePath,
    'id,orderType,address,paymentHash,status,satsAmount,fiatAmount,insertedAt,updatedAt\n',
  );

  for (const order of orders) {
    const btcAddress = order.address?.address ?? '';
    const paymentHash = order.paymentHash ?? '';

    await RNFS.appendFile(
      filePath,
      `${order.id},${order.orderType},${btcAddress},${paymentHash},${
        order.status
      },${order.satsAmount.toFixed(0)},${order.fiatAmount.toFixed(
        2,
      )},${order.insertedAt.toISOString()},${order.updatedAt.toISOString()}\n`,
    );
  }

  // share file to allow saving the file to iOS systems
  if (!isAndroid()) {
    await Share.open({
      title: fileName,
      filename: filePath,
      url: `file://${filePath}`,
      type: 'text/csv',
      saveToFiles: true,
    });
  }

  return fileName;
};

const fileDirectory = (): string => {
  if (isAndroid()) {
    return RNFS.DownloadDirectoryPath;
  } else {
    return RNFS.DocumentDirectoryPath;
  }
};

export default Header;
