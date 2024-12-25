import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import Title from "./Title";

// This test is for fixing the issue with not re-rendering a component
// when its local variable changes. Some changes are made to ./Title component.
describe("Making React re-render global state", () => {
  test("React component updates a global state and re-renders itself", async () => {
    // Arrange.
    const clicked = jest.fn();
    const rendered = jest.fn();
    let globalCounter = undefined;
    function getGlobalCounter() {
      if (globalCounter === undefined) {
        globalCounter = 0;
      }

      return globalCounter;
    }

    function setGlobalCounter(value) {
      globalCounter = value;
    }

    function Title() {
      let count = getGlobalCounter();
      // const onClick = () => {
      //   count++;
      //   console.log('clicked', count);
      // };
    
      // console.log('updated', count);
      rendered();
      return (
        <div className="main">
          <button className="adornment-button" onClick={() => onClick(count)}>+</button>
          <h3 data-testid="test" className="section">Hello World+{count}</h3>
        </div>
      );
    }

    // Act.
    const { rerender } = render(
      <Title />
    );

    function onClick(count) {
      setGlobalCounter(count + 1);
      // count++;
      // console.log('clicked', count);
      clicked(count + 1);
      rerender(
        <Title />
      );
    };

    // First click.
    fireEvent.click(screen.getByText('+'));
    expect(clicked).toHaveBeenCalledWith(1);
    expect(rendered).toHaveBeenCalledTimes(2);
    let textElement = await screen.findByTestId('test');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('Hello World+1');

    // Second click.
    fireEvent.click(screen.getByText('+'));
    expect(clicked).toHaveBeenCalledWith(2);
    expect(rendered).toHaveBeenCalledTimes(3);
    textElement = await screen.findByTestId('test');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('Hello World+2');
  });
});
