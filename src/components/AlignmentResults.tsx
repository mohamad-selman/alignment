import { Result } from '@customTypes/alignment';
import { useState } from 'react';
import AlignmentMatrix from '@src/components/AlignmentMatrix';
import Alignments from '@src/components/Alignments';
import { TableContainer } from '@mui/material';

interface Props {
  result: Result;
}

const AlignmentResults = (props: Props) => {
  const { result } = props;
  const [selected, setSelected] = useState(0);

  return (
    <>
      <TableContainer>
        <Alignments
          optimalAlignments={result.optimalAlignments}
          selected={selected}
          setSelected={setSelected}
        />
      </TableContainer>
      <TableContainer>
        <AlignmentMatrix
          seq1={result.seq2}
          seq2={result.seq1}
          alignMatrix={result.alignMatrix}
          path={result.optimalAlignments[selected].path}
        />
      </TableContainer>
    </>
  );
};

export default AlignmentResults;
