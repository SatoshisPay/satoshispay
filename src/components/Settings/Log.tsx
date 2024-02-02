import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import { LOG_BUFFER } from '../../utils/log';
import Button from '../reusable/Button';
import { isAndroid } from '../../utils/device';
import ErrorModal from '../shared/ErrorModal';
import SuccessModal from '../shared/SuccessModal';

const Log = () => {
  const [data, setData] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);
  const [writing, setWriting] = React.useState(false);

  const getLogBuffer = () => {
    const size = LOG_BUFFER.size();
    setData(LOG_BUFFER.peekN(size) as string[]);
  };

  const onDownload = () => {
    setWriting(true);
    downloadLogFile(data)
      .then(file => {
        setWriting(false);
        setSuccess(`Log scaricato con successo in ${file}`);
      })
      .catch(e => {
        setWriting(false);
        setError(`Errore durante il download del log: ${e.message}`);
      });
  };

  React.useEffect(() => {
    getLogBuffer();
    const interval = setInterval(getLogBuffer, 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="w-full h-full">
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      {success && (
        <SuccessModal message={success} onClick={() => setSuccess(undefined)} />
      )}
      <Text className="text-brandAlt text-3xl text-center">Log</Text>
      <FlatList
        renderItem={LogLine}
        data={data}
        className="border border-gray-300 rounded bg-white mx-auto w-11/12 h-5/6 my-8"
      />
      <Button.Primary onPress={onDownload} disabled={writing}>
        <Text className="text-white bg-brand">Scarica Log</Text>
      </Button.Primary>
    </View>
  );
};

const LogLine = ({ item }: { item: string }) => (
  <View className="w-full">
    <Text className="text-brandAlt">{item}</Text>
  </View>
);

const downloadLogFile = async (log: string[]): Promise<string> => {
  // write csv
  const now = new Date();
  const fileName = `log_${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}.log`;
  const filePath = `${fileDirectory()}/${fileName}`;

  await RNFS.writeFile(filePath, log.join('\n'));

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

export default Log;
