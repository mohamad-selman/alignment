import { Box, Typography, Paper } from '@mui/material';
import { Alignment } from '@customTypes/alignment';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  optimalAlignments: Alignment[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const Alignments = (props: Props) => {
  const { optimalAlignments, selected, setSelected } = props;

  return (
    <Box sx={{ display: 'flex', columnGap: '0.5rem', mb: 4 }}>
      {optimalAlignments.map((oa, idx) => (
        <Paper
          key={idx}
          variant='outlined'
          onClick={() => setSelected(idx)}
          // eslint-disable-next-line prefer-object-spread, object-curly-newline
          sx={Object.assign({ px: 4, py: 1, cursor: 'pointer', flex: 'none' }, idx === selected ? { backgroundColor: 'primary.main' } : {})}
        >
          <Typography
            letterSpacing={3}
            fontWeight={500}
            color={idx === selected ? 'white' : 'black'}
          >
              {oa.seq2Aligned}
            </Typography>
            <Typography
              letterSpacing={3}
              fontWeight={500}
              color={idx === selected ? 'white' : 'black'}
            >
              {oa.seq1Aligned}
            </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Alignments;
