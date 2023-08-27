import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderWrap = styled.div`
  color: #e5e5e5;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  gap: 16px;

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const HeaderNavWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// export const User = styled.p`
// display: block;
//       color: #007aff;
//   `;

export const HeaderNavLink = styled(NavLink)`
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &.active,
  &:hover {
    color: #007aff;
  }
`;

export const Button = styled.button`
  border-radius: 20px;
  background-color: #e5e5e5;
  color: black;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  padding: 8px 16px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: #007aff;
  }
`;