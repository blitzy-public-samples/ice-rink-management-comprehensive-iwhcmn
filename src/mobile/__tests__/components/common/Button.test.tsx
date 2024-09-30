import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../../src/components/common/Button';

describe('Button component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.props.style).toHaveProperty('backgroundColor', '#0B3D91'); // Primary color
  });

  it('renders correctly with secondary variant', () => {
    const { getByText } = render(<Button title="Secondary Button" onPress={() => {}} variant="secondary" />);
    const buttonElement = getByText('Secondary Button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.props.style).toHaveProperty('backgroundColor', '#A5D8FF'); // Secondary color
  });

  it('renders correctly with outline variant', () => {
    const { getByText } = render(<Button title="Outline Button" onPress={() => {}} variant="outline" />);
    const buttonElement = getByText('Outline Button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.props.style).toHaveProperty('borderColor', '#0B3D91');
    expect(buttonElement.props.style).toHaveProperty('borderWidth', 2);
  });

  it('renders correctly when disabled', () => {
    const { getByText } = render(<Button title="Disabled Button" onPress={() => {}} disabled />);
    const buttonElement = getByText('Disabled Button');
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.props.style).toHaveProperty('opacity', 0.5);
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Pressable Button" onPress={onPressMock} />);
    const buttonElement = getByText('Pressable Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Disabled Button" onPress={onPressMock} disabled />);
    const buttonElement = getByText('Disabled Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});

// Human tasks:
// TODO: Implement snapshot testing for different button variants
// TODO: Add tests for custom styles passed via the style prop
// TODO: Implement accessibility testing