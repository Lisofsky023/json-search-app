import React, { useState } from 'react';
import InputMask from 'react-input-mask';

interface SearchFormProps {
  onSubmit: (searchState: { email: string; number: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }
    setEmailError('');
    onSubmit({ email, number });
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
      <InputMask
        mask="99-99-99"
        maskChar="_"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
