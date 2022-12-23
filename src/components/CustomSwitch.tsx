import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import {
  Control,
  Controller,
  Path,
  FieldValues,
} from 'react-hook-form';

export type CustomSwitchProps<T extends FieldValues> = Omit<SwitchProps, 'name'> & {
  name: Path<T>;
  label: string;
  control: Control<T, any>;
};

export const CustomSwitch = <T extends FieldValues>(props: CustomSwitchProps<T>) => {
  const { name, control, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel control={
          <Switch
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
          />
        } label={label} />
      )}
    />
  );
};
