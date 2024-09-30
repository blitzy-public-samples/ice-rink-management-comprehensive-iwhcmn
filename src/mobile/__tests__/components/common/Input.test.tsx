import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { expect, describe, it } from '@jest/globals';
import Input from '../../../src/components/common/Input';

describe('Input component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Input testID="test-input" />);
    const inputElement = getByTestId('test-input');
    expect(inputElement).toBeTruthy();
  });

  it('displays the correct placeholder', () => {
    const placeholder = 'Enter your name';
    const { getByPlaceholderText } = render(<Input placeholder={placeholder} />);
    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<Input testID="test-input" onChangeText={onChangeText} />);
    const inputElement = getByTestId('test-input');
    
    fireEvent.changeText(inputElement, 'Hello, World!');
    expect(onChangeText).toHaveBeenCalledWith('Hello, World!');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<Input testID="test-input" style={customStyle} />);
    const inputElement = getByTestId('test-input');
    
    expect(inputElement.props.style).toEqual(expect.arrayContaining([expect.objectContaining(customStyle)]));
  });

  it('handles focus and blur events', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const { getByTestId } = render(<Input testID="test-input" onFocus={onFocus} onBlur={onBlur} />);
    const inputElement = getByTestId('test-input');
    
    fireEvent(inputElement, 'focus');
    expect(onFocus).toHaveBeenCalled();

    fireEvent(inputElement, 'blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('handles secure text entry', () => {
    const { getByTestId } = render(<Input testID="test-input" secureTextEntry />);
    const inputElement = getByTestId('test-input');
    
    expect(inputElement.props.secureTextEntry).toBe(true);
  });
});

// Human tasks:
// - Implement tests for accessibility features once they are added to the Input component
// - Add tests for different input types if support is added in the future