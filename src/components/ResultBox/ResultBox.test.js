import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = $28.57');
  });

  describe('PLN -> USD conversion', () => {
    const testCases = [
      { amount: 100, expected: 'PLN 100.00 = $28.57' },
      { amount: 200, expected: 'PLN 200.00 = $57.14' },
      { amount: 345, expected: 'PLN 345.00 = $98.57' },
    ];

    for (const test of testCases) {
      it(`should render correct conversion for amount ${test.amount}`, () => {
        render(<ResultBox from="PLN" to="USD" amount={test.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(test.expected);
        cleanup();
      });
    }
  });

  describe('USD -> PLN conversion', () => {
    const testCases = [
      { amount: 100, expected: '$100.00 = PLN 350.00' },
      { amount: 200, expected: '$200.00 = PLN 700.00' },
      { amount: 345, expected: '$345.00 = PLN 1,207.50' },
    ];

    for (const test of testCases) {
      it(`should render correct conversion for amount ${test.amount}`, () => {
        render(<ResultBox from="USD" to="PLN" amount={test.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(test.expected);
        cleanup();
      });
    }
  });

  describe('Same currency conversion', () => {
    it('should return equal values when from and to currencies are the same', () => {
      render(<ResultBox from="PLN" to="PLN" amount={123} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
    });
  });

  describe('Negative amount', () => {
    it('should return error text when amount is negative', () => {
      render(<ResultBox from="PLN" to="USD" amount={-100} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    });
  });
});

