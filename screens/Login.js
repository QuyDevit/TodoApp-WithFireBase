import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert,Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    GoogleSignin.configure({
        webClientId: '70650109900-21l7l529vurdb90fsmgt8h625hhghnsb.apps.googleusercontent.com',
    });

    const handleLogin = () => {
       auth().signInWithEmailAndPassword(email,password)
        .then((data) => console.log(data))
        .catch(e => console.log(e.message))
    };

    const handleLoginWithGoogle = async ()=>{
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true})
        const { idToken } = GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng Nhập</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
            />
           <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
            />
          
            <Button
                title="Login"
                onPress={handleLogin}
            />
          <View style={{marginTop:20}}>
                <GoogleSigninButton onPress={() => handleLoginWithGoogle().then(() => console.log('Signed in with Google!').catch(e=>console.log(e.message)))}/>
              
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'#66cdaa'
    },
    input: {
        marginBottom: 10,
    },
    title:{
         textAlign: 'center',
         fontSize:25,
         color:"white",
         fontWeight:'bold',
         marginBottom:50
    }
});

export default Login;
