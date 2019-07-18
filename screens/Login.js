import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

const VALID_EMAIL = "contact@react-ui-kit.com";
const VALID_PASSWORD = "subscribe";

firebase.initializeApp({
  apiKey: "AIzaSyDZkYTSUiZZmrhLxPc-SWJKrKSxG8Lf7ds",
  authDomain: "easypointxpbr.firebaseapp.com",
  databaseURL: "https://easypointxpbr.firebaseio.com",
  projectId: "easypointxpbr",
  storageBucket: "",
  messagingSenderId: "371123852905",
  appId: "1:371123852905:web:da7a49c5bc842383"
});

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    isAuthenticated: false,
    loading: false,
    errors: ''
  }

  login = async () =>  {
    const { email, password } = this.state;
    const { navigation } = this.props;
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({ isAuthenticated: true })
      {this.state.isAuthenticated ? navigation.navigate('Browse'): navigation.navigate('SignUp')}
  }
  render() { 
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Login</Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Senha"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={this.login}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Login</Text>
              }
            </Button>
            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Esqueceu sua senha?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
