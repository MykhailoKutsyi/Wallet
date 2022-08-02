import styled from 'styled-components';

export const BtnAddTransactions = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background-color: var(--light-green-color);
  box-shadow: 0px 6px 15px rgba(36, 204, 167, 0.5);
  &:hover,
  &:focus {
    background-color: var(--light-green-hover-color);
  }
  @media (max-width: 768px) {
    right: 40px;
    bottom: 40px;
  }
`;

export const BtnIconWrapper = styled.svg`
  height: 20px;
  width: 20px;

  &:hover {
    cursor: pointer;
  }
`;
