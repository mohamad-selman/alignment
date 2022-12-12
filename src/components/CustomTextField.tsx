import { TextField, TextFieldProps } from '@mui/material';
import {
  Control,
  Controller,
  Path,
  FieldValues,
} from 'react-hook-form';

export type CustomTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  name: Path<T>;
  control: Control<T, any>;
};

export const CustomTextField = <T extends FieldValues>(props: CustomTextFieldProps<T>) => {
  const {
    name,
    control,
    type,
    helperText,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <TextField
          type={type}
          onChange={(ev) => {
            onChange(ev);
            if (typeof rest.onChange === 'function') {
              rest.onChange(ev);
            }
          }}
          value={value || ''}
          {...field}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...rest}
        />
      )}
    />
  );
};
