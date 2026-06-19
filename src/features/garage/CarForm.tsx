import type { FormEvent } from 'react';
import { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from '../../constants';

interface CarFormProps {
  name: string;
  color: string;
  submitLabel: string;
  disabled?: boolean;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onSubmit: () => void;
}

const isNameValid = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= CAR_NAME_MIN_LENGTH && trimmed.length <= CAR_NAME_MAX_LENGTH;
};

const CarForm = (props: CarFormProps) => {
  const {
    name,
    color,
    submitLabel,
    disabled = false,
    onNameChange,
    onColorChange,
    onSubmit,
  } = props;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!disabled && isNameValid(name)) onSubmit();
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="car-form__name"
        placeholder="Car name"
        value={name}
        maxLength={CAR_NAME_MAX_LENGTH}
        disabled={disabled}
        onChange={(event) => onNameChange(event.target.value)}
      />
      <input
        type="color"
        className="car-form__color"
        value={color}
        disabled={disabled}
        onChange={(event) => onColorChange(event.target.value)}
      />
      <button type="submit" className="btn btn--primary" disabled={disabled || !isNameValid(name)}>
        {submitLabel}
      </button>
    </form>
  );
};

export default CarForm;
