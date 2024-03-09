import {
  PaymentStatus,
  ReverseSwapStatus,
} from '@breeztech/react-native-breez-sdk';
import React from 'react';
import { View, Text } from 'react-native';
import {
  Withdrawals as BreezWithdrawals,
  breezGetPendingWithdrawals,
} from '../../api/breez';
import WithdrawalItem from './PendingWithdrawals/WithdrawalItem';
import {
  getWithdrawalsByDate,
  getWithdrawalsCount,
  updateWithdrawalStatus,
} from '../../database/database';
import Withdrawal, { WithdrawalStatus } from '../../data/withdrawal';
import PageSelector from '../reusable/PageSelector';
import { error, info } from '../../utils/log';

const MAX_WITHDRAWALS_PER_PAGE = 5;

interface Props {
  setError: (error: string) => void;
}

const WithdrawalHistory = ({ setError }: Props) => {
  const [pendingWithdrawals, setPendingWithdrawals] =
    React.useState<BreezWithdrawals>();
  const [withdrawalsCount, setWithdrawalsCount] = React.useState<number>();
  const [withdrawals, setWithdrawals] = React.useState<Withdrawal[]>();
  const [page, setPage] = React.useState(1);

  const handlePendingWithdrawals = (
    breezWithdrawals: BreezWithdrawals,
    pageWithdrawals: Withdrawal[],
  ) => {
    // update states
    for (const withdrawal of pageWithdrawals) {
      let statusChanged = true;
      const assocSwap = breezWithdrawals.pendingSwaps.find(
        s => s.id === withdrawal.id,
      );

      if (!assocSwap && withdrawal.status !== WithdrawalStatus.COMPLETED) {
        withdrawal.status = WithdrawalStatus.COMPLETED;
      } else if (
        assocSwap &&
        assocSwap.status === ReverseSwapStatus.CANCELLED
      ) {
        withdrawal.status = WithdrawalStatus.CANCELLED;
      } else {
        statusChanged = false;
      }

      // search for lightning invoice
      if (!statusChanged) {
        const assocInvoice = breezWithdrawals.lnWithdrawals.find(
          i => i.id === withdrawal.id,
        );
        if (assocInvoice) {
          if (
            assocInvoice.status === PaymentStatus.FAILED &&
            withdrawal.status !== WithdrawalStatus.CANCELLED
          ) {
            withdrawal.status = WithdrawalStatus.CANCELLED;
            statusChanged = true;
          } else if (
            assocInvoice.status === PaymentStatus.COMPLETE &&
            withdrawal.status !== WithdrawalStatus.COMPLETED
          ) {
            withdrawal.status = WithdrawalStatus.COMPLETED;
            statusChanged = true;
          }
        }
      }

      if (statusChanged) {
        updateWithdrawalStatus(withdrawal)
          .then(() => {
            info('Withdrawal status updated to', withdrawal.status);
          })
          .catch(e => {
            error(e);
            setError(
              `Impossibile aggiornare lo stato del prelievo ${withdrawal.id}: ${e.message}`,
            );
          });
      }
    }
    setWithdrawals(pageWithdrawals);
  };

  React.useEffect(() => {
    if (!withdrawalsCount) {
      getWithdrawalsCount()
        .then(count => {
          setWithdrawalsCount(count);
        })
        .catch(e => {
          error(e);
          setError(`Impossibile ottenere il numero di prelievi: ${e.message}`);
        });
    }
  }, [withdrawalsCount]);

  // if page or pending swaps change, update withdrawals with received data
  React.useEffect(() => {
    if (pendingWithdrawals && withdrawalsCount) {
      getWithdrawalsByDate(
        MAX_WITHDRAWALS_PER_PAGE,
        MAX_WITHDRAWALS_PER_PAGE * (page - 1),
      )
        .then(pageWithdrawals => {
          handlePendingWithdrawals(pendingWithdrawals, pageWithdrawals);
        })
        .catch(e => {
          error(e);
          setError(
            `Impossibile ottenere i prelievi dalla pagina ${page}: ${e.message}`,
          );
        });
    }
  }, [page, pendingWithdrawals, withdrawalsCount]);

  // get pending swaps and set pending swaps
  React.useEffect(() => {
    if (!pendingWithdrawals) {
      breezGetPendingWithdrawals()
        .then(wtds => {
          setPendingWithdrawals(wtds);
        })
        .catch(e => {
          setError(
            `Non è stato possibile verificare i prelievi in attesa: ${e.message}`,
          );
        });
    }
  }, [pendingWithdrawals]);

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
