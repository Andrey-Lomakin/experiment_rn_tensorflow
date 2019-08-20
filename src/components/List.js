// @flow

import React from 'react';
import styled from 'styled-components';

type Props = {
  title: string, 
  opacity: number,
}

export default ({ title, opacity }: Props) => (
  <View>
    <Text opacity={opacity}>{title}</Text>
  </View>
);

const View = styled.View`
  width: 200;
  height: 23;
`;

const Text = styled.Text`
  font-size: 20;
  opacity: ${p => p.opacity};
  color: #FFFFFF;
`;
