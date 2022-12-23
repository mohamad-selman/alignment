import navLinks from '@constants/navLinks';
import needlemanWunsch from '@src/alignment/global';
import { Result } from '@customTypes/alignment';
import Layout from '@components/Layout';
import {
  Typography,
  Box,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { CustomTextField } from '@src/components/CustomTextField';
import AlignmentResults from '@src/components/AlignmentResults';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const useInputForm = () => {
  const { control, watch, formState: { isValid, isValidating } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(z.object({
      seq1: z.string().regex(/^[ACGT]+$/, 'Invalid DNA sequence'),
      seq2: z.string().regex(/^[ACGT]+$/, 'Invalid DNA sequence'),
      match: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      mismatch: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      gapPenalty: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      AA: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      AC: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      AG: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      AT: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      CC: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      CG: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      CT: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      GG: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      GT: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
      TT: z.string().regex(/^-?\d+$/, 'Invalid number').transform(Number),
    })),
    defaultValues: {
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
    },
  });

  const inputData = watch();

  return {
    control,
    isValid,
    isValidating,
    inputData,
  };
};

const Test = () => {
  let result: null | Result = null;
  const [matrixSwitch, setMatrixSwitch] = useState(false);
  const {
    control,
    isValid,
    isValidating,
    inputData,
  } = useInputForm();

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
      <form noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
            <CustomTextField
              name='seq1'
              control={control}
              label='First Sequence'
            />
            <CustomTextField
              name='seq2'
              control={control}
              label='Second Sequence'
            />
          </Box>
          <Box sx={{
            display: 'flex', flexDirection: 'row', columnGap: '2rem', justifyContent: 'space-between',
          }}>
            {matrixSwitch
              ? <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.75rem' }}>
                  <Box>
                    <CustomTextField name='gapPenalty' type='number' control={control} label='Gap Penalty' />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
                    <CustomTextField name='AA' type='number' control={control} label='A-A'/>
                    <CustomTextField name='AC' type='number' control={control} label='A-C'/>
                    <CustomTextField name='AG' type='number' control={control} label='A-G'/>
                    <CustomTextField name='AT' type='number' control={control} label='A-T'/>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
                    <CustomTextField name='CC' type='number' control={control} label='C-C'/>
                    <CustomTextField name='CG' type='number' control={control} label='C-G'/>
                    <CustomTextField name='CT' type='number' control={control} label='C-T'/>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
                    <CustomTextField name='GG' type='number' control={control} label='G-G'/>
                    <CustomTextField name='GT' type='number' control={control} label='G-T'/>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
                    <CustomTextField name='TT' type='number' control={control} label='T-T'/>
                  </Box>
                </Box>
              : <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '0.75rem' }}>
                  <CustomTextField name='match' type='number' control={control} label='Match Score' />
                  <CustomTextField name='mismatch' type='number' control={control} label='Mismatch Score' />
                  <CustomTextField name='gapPenalty' type='number' control={control} label='Gap Penalty' />
                </Box>
            }
            <Box>
              <FormControlLabel control={
                <Switch checked={matrixSwitch} onChange={() => setMatrixSwitch(!matrixSwitch)} />
              } label='Matrix' />
            </Box>
          </Box>
        </Box>
      </form>
      <Divider sx={{ py: 4 }}>Results</Divider>
      {isValid && !isValidating && result && <AlignmentResults result={result} />}
    </Layout>
  );
};

export default Test;
