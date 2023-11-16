import {
  ReverseSwapInfo,
  ReverseSwapStatus,
} from '@breeztech/react-native-breez-sdk';
import React from 'react';
import { View, Text } from 'react-native';
import { breezGetPendingWithdrawals } from '../../api/breez';
import WithdrawalItem from './PendingWithdrawals/WithdrawalItem';
import {
  getWithdrawalsByDate,
  getWithdrawalsCount,
  updateWithdrawalStatus,
} from '../../database/database';
import Withdrawal, { WithdrawalStatus } from '../../data/withdrawal';
import PageSelector from '../reusable/PageSelector';

const MAX_WITHDRAWALS_PER_PAGE = 5;

interface Props {
  setError: (error: string) => void;
}

const WithdrawalHistory = ({ setError }: Props) => {
  const [pendingSwaps, setPendingSwaps] = React.useState<ReverseSwapInfo[]>();
  const [withdrawalsCount, setWithdrawalsCount] = React.useState<number>();
  const [withdrawals, setWithdrawals] = React.useState<Withdrawal[]>();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    if (!withdrawalsCount) {
      getWithdrawalsCount()
        .then(count => {
          setWithdrawalsCount(count);
        })
        .catch(e => {
          console.error(e);
          setError(`Impossibile ottenere il numero di prelievi: ${e.message}`);
        });
    }
  }, [withdrawalsCount]);

  React.useEffect(() => {
    if (pendingSwaps && withdrawalsCount) {
      getWithdrawalsByDate(
        MAX_WITHDRAWALS_PER_PAGE,
        MAX_WITHDRAWALS_PER_PAGE * (page - 1),
      )
        .then(pageWithdrawals => {
          // update states
          for (const withdrawal of pageWithdrawals) {
            let statusChanged = true;
            const assocSwap = pendingSwaps.find(s => s.id === withdrawal.id);

            if (!assocSwap) {
              withdrawal.status = WithdrawalStatus.COMPLETED;
            } else if (assocSwap.status === ReverseSwapStatus.CANCELLED) {
              withdrawal.status = WithdrawalStatus.CANCELLED;
            } else {
              statusChanged = false;
            }

            if (statusChanged) {
              updateWithdrawalStatus(withdrawal)
                .then(() => {
                  console.log(
                    'Withdrawal status updated to',
                    withdrawal.status,
                  );
                })
                .catch(e => {
                  console.error(e);
                  setError(
                    `Impossibile aggiornare lo stato del prelievo ${withdrawal.id}: ${e.message}`,
                  );
                });
            }
          }
          setWithdrawals(pageWithdrawals);
        })
        .catch(e => {
          console.error(e);
          setError(
            `Impossibile ottenere i prelievi dalla pagina ${page}: ${e.message}`,
          );
        });
    }
  }, [page, pendingSwaps, withdrawalsCount]);

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
  }, [pendingSwaps]);

  if (!withdrawals || withdrawals.length === 0) {
    return null;
  }

  const minPage = Math.max(1, page - 2);
  const maxPage = Math.min(
    Math.max(4, page + 2),
    withdrawalsCount
      ? Math.ceil(withdrawalsCount / MAX_WITHDRAWALS_PER_PAGE)
      : 0,
  );

  return (
    <View className="flex flex-col mx-auto w-full py-4 px-2">
      <Text className="text-2xl text-center">Storico prelievi</Text>
      <View>
        {withdrawals.map(withdrawal => (
          <WithdrawalItem key={withdrawal.id} withdrawal={withdrawal} />
        ))}
      </View>
      <PageSelector
        onChange={setPage}
        page={page}
        min={minPage}
        max={maxPage}
      />
    </View>
  );
};

export default WithdrawalHistory;
