import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom matchers
import { Block } from '../../components';

describe("Block Component", () => {

  test('renders block with their accurate style ?', async () => {

    const pixelSize: number = Math.floor(Math.random() * 40);
    const topPosition: number = Math.floor(Math.random() * 200);
    const leftPosition: number = Math.floor(Math.random() * 200);

    render(<Block leftPosition={leftPosition} topPosition={topPosition} pixelSize={pixelSize} type={"green"} />);
    const myBlock = screen.getByRole('img');
    expect(myBlock).toBeInTheDocument();

    expect(myBlock).toHaveStyle({
      height: `${pixelSize}px`,
      width: `${pixelSize}px`,
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
    });


  });
});

