import { useState } from 'react';
import navLinks from '@constants/navLinks';
import Layout from '@components/Layout';
import { Typography, Divider } from '@mui/material';
import useInputForm from '@src/components/useInputForm';
import InputForm from '@src/components/InputForm';
import AlignmentResults from '@src/components/AlignmentResults';
import needlemanWunsch from '@src/alignment/global';
import { Result } from '@customTypes/alignment';

const Test = () => {
  console.log('In Test');

  let result: null | Result = null;
  const [matrixSwitch, setMatrixSwitch] = useState(false);
  const {
    control,
    isValid,
    isValidating,
    inputData,
  } = useInputForm({
    seq1: 'ACTCG',
    seq2: 'ACAGTAG',
    match: '1',
    mismatch: '0',
    gapPenalty: '-1',
    AA: '1',
    AC: '0',
    AG: '0',
    AT: '0',
    CC: '1',
    CG: '0',
    CT: '0',
    GG: '1',
    GT: '0',
    TT: '1',
  });

  if (isValid && !isValidating) {
    const matchOrMismatch = matrixSwitch
      ? {
        A: {
          A: Number(inputData.AA),
          C: Number(inputData.AC),
          G: Number(inputData.AG),
          T: Number(inputData.AT),
        },
        C: {
          A: Number(inputData.AC),
          C: Number(inputData.CC),
          G: Number(inputData.CG),
          T: Number(inputData.CT),
        },
        G: {
          A: Number(inputData.AG),
          C: Number(inputData.CG),
          G: Number(inputData.GG),
          T: Number(inputData.GT),
        },
        T: {
          A: Number(inputData.AT),
          C: Number(inputData.CT),
          G: Number(inputData.GT),
          T: Number(inputData.TT),
        },
      }
      : {
        A: {
          A: Number(inputData.match),
          C: Number(inputData.mismatch),
          G: Number(inputData.mismatch),
          T: Number(inputData.mismatch),
        },
        C: {
          A:
          Number(inputData.mismatch),
          C: Number(inputData.match),
          G: Number(inputData.mismatch),
          T: Number(inputData.mismatch),
        },
        G: {
          A: Number(inputData.mismatch),
          C: Number(inputData.mismatch),
          G: Number(inputData.match),
          T: Number(inputData.mismatch),
        },
        T: {
          A: Number(inputData.mismatch),
          C: Number(inputData.mismatch),
          G: Number(inputData.mismatch),
          T: Number(inputData.match),
        },
      };

    result = needlemanWunsch({
      sequence1: inputData.seq2,
      sequence2: inputData.seq1,
      scoring: {
        gap: Number(inputData.gapPenalty),
        matchOrMismatch,
      },
    });
  }

  return (
    <Layout navLinks={navLinks}>
      <Typography variant='h4' sx={{ mb: 5 }} color='secondary.main'>
        Needleman-Wunsch Algorithm
      </Typography>
      <InputForm
        control={control}
        matrixSwitch={matrixSwitch}
        setMatrixSwitch={setMatrixSwitch}
      />
      <Divider sx={{ py: 4 }}>Results</Divider>
      {isValid && !isValidating && result && <AlignmentResults result={result} />}
    </Layout>
  );
};

export default Test;
