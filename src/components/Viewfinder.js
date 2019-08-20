// @flow
import React from 'react';
import { View } from 'react-native';

import styles from './styles';

type Props = {
  success: boolean
}

export default ({ success }: Props) => {
  const borderColor = success ? '#003B00' : 'rgba(0,0,0,0.2)';
  const borderColorWhite = success ? '#00FF41' : '#FFFFFF';
  return (
    <View style={styles.c}>
      <View style={[styles.ctlw, { borderColor: borderColorWhite }]} />
      <View style={[styles.ctrw, { borderColor: borderColorWhite }]} />
      <View style={[styles.cbrw, { borderColor: borderColorWhite }]} />
      <View style={[styles.cblw, { borderColor: borderColorWhite }]} />
      <View style={[styles.ctl, { borderColor }]} />
      <View style={[styles.ctr, { borderColor }]} />
      <View style={[styles.cbr, { borderColor }]} />
      <View style={[styles.cbl, { borderColor }]} />

      <View style={[styles.ccc, { borderColor: borderColorWhite }]}>
        <View style={[styles.cc, { borderColor }]} />
      </View>
    </View>
  );
};
