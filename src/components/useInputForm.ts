import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormValues from '@customTypes/form';

const useInputForm = (defaultValues: FormValues) => {
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
      matrixSwitch: z.boolean(),
    })),
    defaultValues,
  });

  const inputData = watch();

  return {
    control,
    isValid,
    isValidating,
    inputData,
  };
};

export default useInputForm;
