import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// Airbitz core libraries:
import { makeReactNativeContext } from 'airbitz-core-react-native'
import {
  LoginScreen,
  ChangePasswordScreen,
  ChangePinScreen,
  ChooseTestAppScreen
} from 'airbitz-core-js-ui'

function setupCore () {
  return makeReactNativeContext({
    // Replace this with your own API key from https://developer.airbitz.co:
    apiKey: '0b5776a91bf409ac10a3fe5f3944bf50417209a0',
    appId: 'com.mydomain.myapp',
    vendorName: 'Chain Net',
    vendorImageUrl: 'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
  })
}

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      context: null,
      account: null,
      screen: 'login'
    }

    // Creating the context is async, so we store it in our state:
    setupCore().then(context => this.setState(state => ({ ...state, context })))
  }
  onLogin (error = null, accountObject) {
    this.setState({
      account: accountObject,
      screen: 'chooseScreen'
    })
  }
  changePin () {
    this.setState({
      screen: 'changePin'
    })
  }

  changePassword () {
    this.setState({
      screen: 'changePassword'
    })
  }
  recoverPassword () {
    this.setState({
      screen: 'login'
    })
  }

  onCancelApp () {
    this.setState({
      screen: 'chooseScreen'
    })
  }

  render () {
    if (this.state.screen === 'changePassword') {
      return (
        <View style={styles.container}>
          <ChangePasswordScreen
            accountObject={this.state.context}
            onComplete={this.onCancelApp.bind(this)}
          />
        </View>
      )
    }
    if (this.state.screen === 'changePin') {
      return (
        <View style={styles.container}>
          <ChangePinScreen
            accountObject={this.state.context}
            onComplete={this.onCancelApp.bind(this)}
            onCancel={this.onCancelApp.bind(this)}
          />
        </View>
      )
    }
    if (this.state.screen === 'chooseScreen') {
      return (
        <View style={styles.container}>
          <ChooseTestAppScreen
            onChangePassword={this.changePassword.bind(this)}
            onChangePin={this.changePin.bind(this)}
            onRecoverPassword={this.recoverPassword.bind(this)}
            onCancel={this.onCancelApp.bind(this)}
          />
        </View>
      )
    }
    // Once the context is ready, we can show the login screen:
    return (
      <View style={styles.container}>
        {this.state.context
          ? <LoginScreen
            context={this.state.context}
            onLogin={this.onLogin.bind(this)}
            />
          : <Text style={styles.welcome}>Loading</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
