/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Alert, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';
import * as Keychain from 'react-native-keychain';

export const SECURITY_LEVEL = Object.freeze({ 
  ANY: Keychain.RNKeychainManager && Keychain.RNKeychainManager.SECURITY_LEVEL_ANY, 
  SECURE_SOFTWARE: Keychain.RNKeychainManager && Keychain.RNKeychainManager.SECURITY_LEVEL_SECURE_SOFTWARE, 
  SECURE_HARDWARE: Keychain.RNKeychainManager && Keychain.RNKeychainManager.SECURITY_LEVEL_SECURE_HARDWARE, });

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

export default () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  const [userinfo, setuserinfo] = useState(null)
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      ...configs.apprnauth
    });
  }, []);
  const configs = {
    apprnauth: {
      issuer: 'http://localhost:8080/auth/realms/djangowebapp-realm',
      clientId: 'react-native-app',
      redirectUrl: 'apprnauth.demo:/oauthredirect',
      serviceConfiguration: {
        authorizationEndpoint: 'http://localhost:8080/auth/realms/djangowebapp-realm/protocol/openid-connect/auth',
        tokenEndpoint: 'http://localhost:8080/auth/realms/djangowebapp-realm/protocol/openid-connect/token',
      }
    }
  }

  const getAccesstoken = async () => {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {

        return credentials.password

      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  const getUser = async () => {
    try {
      const access_token = await getAccesstoken();
      console.log("access_token",access_token)

      if (access_token !== null) {
        fetch("http://localhost:5000/user", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + access_token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log('getUser',json);

            setuserinfo(json);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAuthorize = useCallback(
    async () => {
      try {
        console.log('handleAuthorize initialize...')
        const newAuthState = await authorize(configs.apprnauth);
        console.log('handleAuthorize',newAuthState)
        setAuthState({
          hasLoggedInOnce: true,
          ...newAuthState
        });
        await Keychain.setGenericPassword('accessToken', newAuthState.accessToken);
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState]
  );


  return (
    <View style={styles.container}>
      {authState.accessToken ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => getUser()}
        >
          <Text style={styles.buttonText}>Mi Perfil</Text>
        </TouchableOpacity>
      ) : (<TouchableOpacity
        style={styles.button}
        onPress={() => handleAuthorize()}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>)}
      {userinfo ? (
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.userInfoText}>Username: {userinfo.given_name}</Text>
            <Text style={styles.userInfoText}></Text>
            <Text style={styles.userInfoText}>Email: {userinfo.email}</Text>
            <Text style={styles.userInfoText}></Text>
          </View>
        </View>
      ) : (
          <View></View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#4388c7",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#2674bb",
    borderRadius: 15,
    padding: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  userInfo: {
    height: 300,
    width: 300,
    alignItems: "center",
  }, 
  userInfoText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
  },
  profileImage: {
    height: 64,
    width: 64,
    marginBottom: 32,
  },
});
