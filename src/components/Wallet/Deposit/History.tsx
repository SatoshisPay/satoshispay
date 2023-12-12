import React from 'react';
import Deposit, { DepositStatus } from '../../../data/deposit';
import {
  getAllDeposits,
  getDeposits,
  getDepositsCount,
  updateDepositStatus,
} from '../../../database/database';
import Spinner from '../../reusable/Spinner';
import { Text, View } from 'react-native';
import PageSelector from '../../reusable/PageSelector';
import DepositList from './History/DepositList';
import {
  breezGetFailedDeposits,
  breezGetPendingDeposit,
} from '../../../api/breez';

const MAX_DEPOSITS_PER_PAGE = 10;

interface Props {
  setError: (error: string) => void;
}

const History = ({ setError }: Props) => {
  const [processedPendingDeposits, setProcessedPendingDeposits] =
    React.useState<boolean>(false);
  const [deposits, setDeposits] = React.useState<Deposit[]>([]);
  const [depositsCount, setDepositsCount] = React.useState<number>();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadDeposits = () => {
    setLoading(true);

    getDeposits(MAX_DEPOSITS_PER_PAGE, (page - 1) * MAX_DEPOSITS_PER_PAGE)
      .then(depositsByDate => {
        setLoading(false);
        setDeposits(depositsByDate);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  const depositsView = () => {
    if (loading) {
      return (
        <Spinner bgColor="bg-transparent">
          <Text>Caricamento...</Text>
        </Spinner>
      );
    }

    const minPage = Math.max(1, page - 2);
    const maxPage = Math.min(
      Math.max(4, page + 2),
      depositsCount ? Math.ceil(depositsCount / MAX_DEPOSITS_PER_PAGE) : 0,
    );

    if (depositsCount) {
      return (
        <View className="flex flex-col justify-between">
          <PageSelector
            onChange={setPage}
            page={page}
            min={minPage}
            max={maxPage}
          />
          <DepositList deposits={deposits} />
          <PageSelector
            onChange={setPage}
            page={page}
            min={minPage}
            max={maxPage}
          />
        </View>
      );
    }

    return (
      <Text className="text-center text-lg">
        Non c'è nessun deposito inserito
      </Text>
    );
  };

  React.useEffect(() => {
    if (!loading) {
      loadDeposits();
    }
  }, [depositsCount, page]);

  React.useEffect(() => {
    if (processedPendingDeposits) {
      if (!depositsCount) {
        getDepositsCount()
          .then(count => {
            setDepositsCount(count);
          })
          .catch(err => {
            console.error(err.message);
            setError('Impossibile ottenere il numero di depositi inseriti');
          });
      }
    }
  }, [processedPendingDeposits]);

  React.useEffect(() => {
    if (!processedPendingDeposits) {
      processPendingDeposits()
        .then(() => {
          setProcessedPendingDeposits(true);
        })
        .catch(e => {
          console.error(e);
          setProcessedPendingDeposits(true);
        });
    }
  }, []);

  return (
    <View className="flex flex-col justify-start">
      <Text className="text-center text-2xl text-brandAlt">
        Storico depositi
      </Text>
      {depositsView()}
    </View>
  );
};

const processPendingDeposits = async () => {
  const deposits = await getAllDeposits();
  // check pending deposit
  const pendingDeposit = await breezGetPendingDeposit();
  const refundableDeposits = await breezGetFailedDeposits();

  // iter deposits
  for (const deposit of deposits) {
    if (
      deposit.status === DepositStatus.COMPLETED ||
      deposit.status === DepositStatus.REFUNDED
    ) {
      continue;
    }
    // check if pending deposit is the same
    if (
      deposit.address === pendingDeposit?.bitcoinAddress &&
      deposit.status === DepositStatus.IN_PROGRESS
    ) {
      continue;
    }
    // check if has failed
    const hasFailed = refundableDeposits.some(
      failedDepo => failedDepo.bitcoinAddress === deposit.address,
    );
    if (hasFailed) {
      deposit.status = DepositStatus.REFUNDABLE;
    } else if (deposit.status === DepositStatus.IN_PROGRESS) {
      deposit.status = DepositStatus.COMPLETED;
    }
    // update status
    await updateDepositStatus(deposit);
  }
};

export default History;
