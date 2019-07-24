import React, { Component } from 'react';
import { Animated, Alert, ActivityIndicator, Keyboard,  Modal, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';


export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
    showTerms: false,
  }

  scrollX = new Animated.Value(0);

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Termos de uso</Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.  
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              2. Support for Expo services is only available in English, via e-mail.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service. 
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo's trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              6. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Expo.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              7. We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              8. Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Expo customer, employee, member, or officer will result in immediate account termination.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              9. You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              10. You must not upload, post, host, or transmit unsolicited e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showTerms: false })}>
              <Text center white>Eu Concordo</Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }


  handleSignUp() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: false });

    if (!email) errors.push('email');
    if (!password) errors.push('password');
    if (password.length < 6) {
      errors.push('password');
      Alert.alert(
        'Erro!',
        'A senha deve possuir 6 digitos',
        [
          {
            text: 'Continuar', onPress: () => {
              navigation.navigate('SignUp')
            }
          }
        ],
        { cancelable: false }
      )
    }
    this.setState({ errors, loading: false });

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  
    if (!errors.length) {
      Alert.alert(
        'Sucesso!',
        'Sua conta foi criada',
        [
          {
            text: 'Continuar', onPress: () => {
              navigation.navigate('Login')
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Cadastro</Text>
          <Block middle>
            <Input
              email
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
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Cadastre-se</Text>
              }
            </Button>
            <Button onPress={() => this.setState({ showTerms: true })}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>Termos de uso</Text>
            </Button>
            {this.renderTermsService()}
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
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
