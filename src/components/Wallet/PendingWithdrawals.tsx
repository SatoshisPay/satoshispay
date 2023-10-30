import { ReverseSwapInfo } from '@breeztech/react-native-breez-sdk';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { breezGetPendingWithdrawals } from '../../api/breez';
import WithdrawalItem from './PendingWithdrawals/WithdrawalItem';

interface Props {
  setError: (error: string) => void;
}

const PendingWithdrawals = ({ setError }: Props) => {
  const [pendingSwaps, setPendingSwaps] = React.useState<ReverseSwapInfo[]>();

  React.useEffect(() => {
    if (!pendingSwaps) {
      breezGetPendingWithdrawals()
        .then(swaps => {
          setPendingSwaps(swaps);
        })
        .catch(error => {
          setError(
            `Non è stato possibile verificare i prelievi in attesa: ${error.message}`,
          );
        });
    }
  });

  if (!pendingSwaps || pendingSwaps.length === 0) {
    return null;
  }

  return (
    <View className="flex flex-col mx-auto w-full py-4 px-2">
      <Text className="text-xl">Prelievi in corso</Text>
      <FlatList
        data={pendingSwaps}
        renderItem={({ item }) => <WithdrawalItem swap={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
      />
    </View>
  );
};

export default PendingWithdrawals;
