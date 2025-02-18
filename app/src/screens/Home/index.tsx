import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { type Dispatch, type State } from '../../store/app';
import { logout } from '../../store/user';

const TwilioLogo = require('../../../assets/icons/logo-twilio-red.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F6',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
  },
  body: {
    marginHorizontal: 40,
    marginTop: 30,
  },
  client: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontWeight: '700',
    fontSize: 24,
    marginTop: 8,
  },
  logoContainer: {
    marginTop: 100,
    marginLeft: 18,
  },
  logoutText: {
    color: '#0263E0',
    textDecorationLine: 'underline',
    padding: 0,
  },
});

const Home: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector((state: State) => state.voice.user);

  const handleLogout = async () => {
    const logoutAction = await dispatch(logout());
    if (logout.rejected.match(logoutAction)) {
      console.error(logoutAction.error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={TwilioLogo} resizeMode="contain" />
      </View>
      <View style={styles.body}>
        <Text>Ahoy!</Text>
        <View style={styles.client}>
          <Text>Client ID:</Text>
          <TouchableHighlight onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableHighlight>
        </View>
        {user?.status === 'fulfilled' && (
          <Text style={styles.userText}>{user.email}</Text>
        )}
      </View>
    </View>
  );
};

export default Home;
