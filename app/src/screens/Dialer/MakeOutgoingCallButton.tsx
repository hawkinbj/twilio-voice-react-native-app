import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Button, { type Props as ButtonProps } from '../../components/Button';

const MakeOutgoingCallSource = require('../../../assets/icons/make-call.png');

export type Props = Pick<ButtonProps, 'disabled' | 'onPress'>;

const MakeOutgoingCallButton: React.FC<Props> = ({ disabled, onPress }) => (
  <Button disabled={disabled} size={96} onPress={onPress}>
    <Image
      source={MakeOutgoingCallSource}
      resizeMode="contain"
      style={styles.image}
    />
  </Button>
);

const styles = StyleSheet.create({
  image: {
    maxHeight: '75%',
  },
});

export default MakeOutgoingCallButton;
