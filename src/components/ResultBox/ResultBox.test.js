import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  // Ćwiczenie 1 – renderowanie
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  // Ćwiczenie 2 – pojedyncza konwersja PLN -> USD
  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = $28.57');
  });

  // Ćwiczenie 3 – wiele przypadków PLN -> USD
  const plnToUsdCases = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 20, expected: 'PLN 20.00 = $5.71' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
    { amount: 345, expected: 'PLN 345.00 = $98.57' },
  ];

  for (const testObj of plnToUsdCases) {
    it(`should render proper conversion from PLN to USD for ${testObj.amount}`, () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    });
  }

  // Ćwiczenie 4 – przypadki USD -> PLN
  const usdToPlnCases = [
    { amount: 1, expected: '$1.00 = PLN 3.50' },
    { amount: 10, expected: '$10.00 = PLN 35.00' },
    { amount: 50, expected: '$50.00 = PLN 175.00' },
    { amount: 123, expected: '$123.00 = PLN 430.50' },
  ];

  for (const testObj of usdToPlnCases) {
    it(`should render proper conversion from USD to PLN for ${testObj.amount}`, () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    });
  }

  // Ćwiczenie 5 – przypadki from === to
  const sameCurrencyCases = [
    { amount: 50, currency: 'PLN', expected: 'PLN 50.00 = PLN 50.00' },
    { amount: 123, currency: 'USD', expected: '$123.00 = $123.00' },
  ];

  for (const testObj of sameCurrencyCases) {
    it(`should return same value when from and to are equal for ${testObj.currency}`, () => {
      render(
        <ResultBox from={testObj.currency} to={testObj.currency} amount={testObj.amount} />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    });
  }
});
