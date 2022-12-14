export interface MatchOrMismatch {
  A: number;
  C: number;
  G: number;
  T: number;
}

export interface Scoring {
  gap: number;
  matchOrMismatch: {
    A: MatchOrMismatch;
    C: MatchOrMismatch;
    G: MatchOrMismatch;
    T: MatchOrMismatch;
  }
}

export type Nucleotide = 'A' | 'C' | 'G' | 'T';

export interface Alignment {
  seq1Aligned: string;
  seq2Aligned: string;
  path: number[][];
}

export interface Result {
  alignMatrix: number[][];
  alignmentScore: number;
  optimalAlignments: Alignment[];
}
