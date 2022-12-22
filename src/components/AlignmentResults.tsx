import { Result } from '@customTypes/alignment';
import { Dispatch, SetStateAction } from 'react';
import AlignmentMatrix from '@src/components/AlignmentMatrix';
import Alignments from '@src/components/Alignments';
import { TableContainer } from '@mui/material';

interface Props {
  result: Result;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const AlignmentResults = (props: Props) => {
  const { result, selected, setSelected } = props;

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
