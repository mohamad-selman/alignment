import navLinks from '@constants/navLinks';
import Layout from '@components/Layout';
import { Typography, Divider } from '@mui/material';
import useInputForm from '@src/components/useInputForm';
import InputForm from '@src/components/InputForm';
import AlignmentResults from '@src/components/AlignmentResults';
import watermanSmith from '@src/alignment/local';
import scoringMatrix from '@src/components/scoringMatrix';
import { Result } from '@customTypes/alignment';

const Local = () => {
  let result: null | Result = null;
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
    matrixSwitch: false,
  });

  if (isValid && !isValidating) {
    result = watermanSmith({
      sequence1: inputData.seq2,
      sequence2: inputData.seq1,
      scoring: scoringMatrix(inputData),
    });
  }

  return (
    <Layout navLinks={navLinks}>
      <Typography variant='h4' sx={{ mb: 5 }} color='secondary.main'>
        Waterman-Smith Algorithm
      </Typography>
      <InputForm control={control} matrixSwitch={inputData.matrixSwitch} />
      <Divider sx={{ py: 4 }}>Results</Divider>
      {isValid && !isValidating && result && <AlignmentResults result={result} />}
    </Layout>
  );
};

export default Local;
