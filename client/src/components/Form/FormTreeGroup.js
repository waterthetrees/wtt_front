import React from 'react';
import { styled } from '@mui/material';

const Group = styled('div')`
  margin-bottom: 15px;
  border-radius: 0 0 25px 25px;
  background-color: #658e52;
  background-image: url(../../assets/images/addtree/all_leaf.svg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const Header = styled('div')`
  color: white;
  font-size: 1.75rem;
  padding: 5px 20px;
  margin: auto 0;
`;

const Content = styled('div')`
  padding: 10px 10px 25px 10px;
  margin: 0 10px 10px;
  border-radius: 0 0 15px 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export default function FormTreeGroup({ title, children }) {
  return (
    <Group>
      <Header>
        {title}
      </Header>
      <Content>
        {children}
      </Content>
    </Group>
  );
}
