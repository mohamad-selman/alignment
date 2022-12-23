import { Box, Switch, FormControlLabel } from '@mui/material';
import { CustomTextField } from '@src/components/CustomTextField';
import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';
import FormValues from '@customTypes/form';

interface Props {
  control: Control<FormValues, any>;
  matrixSwitch: boolean;
  setMatrixSwitch: Dispatch<SetStateAction<boolean>>;
}

const InputForm = (props: Props) => {
  const { control, matrixSwitch, setMatrixSwitch } = props;

  return (
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
  );
};

export default InputForm;
