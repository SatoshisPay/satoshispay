import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Orders from '../components/History/Orders';
import Header from '../components/History/Header';
import { ScrollView } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, Page.HISTORY>;

const History = ({}: Props) => {
  const [startDate, setStartDate] = React.useState<Date>(
    new Date(`${new Date().getFullYear()}-01-01`),
  );
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  return (
    <Activity.ListPage>
      <ScrollView>
        <Header
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <Orders startDate={startDate} endDate={endDate} />
      </ScrollView>
    </Activity.ListPage>
  );
};

export default History;
