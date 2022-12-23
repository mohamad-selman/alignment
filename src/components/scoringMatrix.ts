import { Scoring } from '@customTypes/alignment';
import FormValues from '@customTypes/form';

const scoringMatrix = (inputData: FormValues): Scoring => {
  const matchOrMismatch = inputData.matrixSwitch
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

  return {
    gap: Number(inputData.gapPenalty),
    matchOrMismatch,
  };
};

export default scoringMatrix;
