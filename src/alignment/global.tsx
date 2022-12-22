import {
  Scoring,
  Alignment,
  Nucleotide,
  Result,
} from '@customTypes/alignment';

interface Props {
  sequence1: string;
  sequence2: string;
  scoring: Scoring;
}

const needlemanWunsch = (props: Props): Result => {
  const { sequence1: seq1, sequence2: seq2, scoring } = props;
  const alignMatrix = Array.from(Array(seq1.length + 1), () => new Array(seq2.length + 1));

  alignMatrix[0][0] = 0;

  for (let i = 1; i <= seq1.length; i += 1) {
    alignMatrix[i][0] = alignMatrix[i - 1][0] + scoring.gap;
  }

  for (let j = 1; j <= seq2.length; j += 1) {
    alignMatrix[0][j] = alignMatrix[0][j - 1] + scoring.gap;
  }

  // Compute the alignment score matrix
  for (let i = 1; i <= seq1.length; i += 1) {
    const aChar = seq1[i - 1] as Nucleotide;

    for (let j = 1; j <= seq2.length; j += 1) {
      const bChar = seq2[j - 1] as Nucleotide;

      alignMatrix[i][j] = Math.max(
        alignMatrix[i - 1][j] + scoring.gap, // up
        alignMatrix[i][j - 1] + scoring.gap, // left
        alignMatrix[i - 1][j - 1] + scoring.matchOrMismatch[aChar][bChar], // diagonal
      );
    }
  }

  // Backtrack to find all optimal alignments
  const alignments: Alignment[] = [];
  // eslint-disable-next-line max-len
  const backtrack = (i: number, j: number, seq1Aligned: string, seq2Aligned: string, path: number[][]) => {
    path.push([i, j]);

    if (i === 0 || j === 0) {
      while (i !== 0) {
        seq1Aligned = seq1[i - 1] + seq1Aligned;
        seq2Aligned = `—${seq2Aligned}`;
        i -= 1;
      }

      while (j !== 0) {
        seq1Aligned = `—${seq1Aligned}`;
        seq2Aligned = seq2[j - 1] + seq2Aligned;
        j -= 1;
      }

      alignments.push({
        seq1Aligned,
        seq2Aligned,
        path,
      });

      return;
    }

    const aChar = seq1[i - 1] as Nucleotide;
    const bChar = seq2[j - 1] as Nucleotide;

    if (alignMatrix[i][j] === (alignMatrix[i - 1][j - 1] + scoring.matchOrMismatch[aChar][bChar])) {
      // diagonal path
      backtrack(i - 1, j - 1, seq1[i - 1] + seq1Aligned, seq2[j - 1] + seq2Aligned, [...path]);
    }
    if (alignMatrix[i][j] === alignMatrix[i - 1][j] + scoring.gap) {
      // up path
      backtrack(i - 1, j, seq1[i - 1] + seq1Aligned, `—${seq2Aligned}`, [...path]);
    }
    if (alignMatrix[i][j] === alignMatrix[i][j - 1] + scoring.gap) {
      // left path
      backtrack(i, j - 1, `—${seq1Aligned}`, seq2[j - 1] + seq2Aligned, [...path]);
    }
  };

  const i = seq1.length;
  const j = seq2.length;
  const seq1Aligned = '';
  const seq2Aligned = '';
  const path: number[][] = [];
  backtrack(i, j, seq1Aligned, seq2Aligned, path);

  return {
    seq1,
    seq2,
    alignMatrix,
    alignmentScore: alignMatrix[seq1.length][seq2.length],
    optimalAlignments: alignments,
  };
};

export default needlemanWunsch;
