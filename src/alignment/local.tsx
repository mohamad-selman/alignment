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

const watermanSmith = (props: Props): Result => {
  const { sequence1: seq1, sequence2: seq2, scoring } = props;
  const alignMatrix = Array.from(Array(seq1.length + 1), () => new Array(seq2.length + 1));

  alignMatrix[0][0] = 0;

  for (let i = 1; i <= seq1.length; i += 1) {
    alignMatrix[i][0] = 0;
  }

  for (let j = 1; j <= seq2.length; j += 1) {
    alignMatrix[0][j] = 0;
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
        0,
      );
    }
  }

  // Find the maximum alignment score
  let score = 0;
  let scoreIndexes: number[][] = [];

  for (let i = 1; i <= seq1.length; i += 1) {
    for (let j = 1; j <= seq2.length; j += 1) {
      if (alignMatrix[i][j] > score) {
        score = alignMatrix[i][j];
        scoreIndexes = [[i, j]];
      } else if (alignMatrix[i][j] === score) {
        scoreIndexes.push([i, j]);
      }
    }
  }

  // Backtrack to find all optimal alignments
  const alignments: Alignment[] = [];

  for (let idx = 0; idx < scoreIndexes.length; idx += 1) {
    const scoreIndex = scoreIndexes[idx];

    let countdown = score;
    let i = scoreIndex[0];
    let j = scoreIndex[1];
    let seq1Aligned = '';
    let seq2Aligned = '';

    while (countdown > 0) {
      const aChar = seq1[i - 1] as Nucleotide;
      const bChar = seq2[j - 1] as Nucleotide;

      // eslint-disable-next-line max-len
      if (alignMatrix[i][j] === (alignMatrix[i - 1][j - 1] + scoring.matchOrMismatch[aChar][bChar])) {
        // diagonal path
        seq1Aligned = seq1[i - 1] + seq1Aligned;
        seq2Aligned = seq2[j - 1] + seq2Aligned;
        i -= 1;
        j -= 1;
        countdown = alignMatrix[i][j];
      } else if (alignMatrix[i][j] === alignMatrix[i - 1][j] + scoring.gap) {
        // up path
        seq1Aligned = seq1[i - 1] + seq1Aligned;
        seq2Aligned = `_${seq2Aligned}`;
        i -= 1;
      } else {
        // left path
        seq1Aligned = `_${seq1Aligned}`;
        seq2Aligned = seq2[j - 1] + seq2Aligned;
        j -= 1;
      }
    }

    alignments.push({
      seq1Aligned,
      seq2Aligned,
    });
  }

  return {
    alignMatrix,
    alignmentScore: score,
    optimalAlignments: alignments,
  };
};

export default watermanSmith;
