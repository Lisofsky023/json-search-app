import React, { useState, useRef, forwardRef } from 'react';
import InputMask from 'react-input-mask';

interface SearchFormProps {
  onSubmit: (searchState: { email: string; number: string }) => void;
}

const InputMaskWithRef = forwardRef<HTMLInputElement, React.ComponentProps<typeof InputMask>>(
  (props, ref) => <InputMask {...props} inputRef={ref} />
);

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [numberError, setNumberError] = useState<string>('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }
    setEmailError('');

    if (number && number.includes('_')) {
      setNumberError('Please complete the number field');
      return;
    }
    setNumberError('');

    // Trigger onSubmit prop with email and number values
    onSubmit({ email, number });
  };

  // Handle changes in the number input
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNumber(newValue);

    // Clear number error if field is fully filled
    if (!newValue.includes('_')) {
      setNumberError('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError('');
        }}
        required
      />
      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
      <label>Number:</label>
      <InputMaskWithRef
        ref={inputRef}
        mask="99-99-99"
        maskChar="_"
        value={number}
        onChange={handleNumberChange}
      />
      {numberError && <p style={{ color: 'red' }}>{numberError}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
