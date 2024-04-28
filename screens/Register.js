import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert,Text } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const hasErrorPassword = () => password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm != password;
    const hasErrorEmail = () => !email.includes("@");

    const handleRegister = () => {

        auth().createUserWithEmailAndPassword(email,password)
            .then(() => Alert.alert("Đăng ký tài khoản thành công!"))
            .catch(e=> Alert.alert(e.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký tài khoản</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
            />
            <HelperText type='error' visible={hasErrorEmail()}>Vui lòng kiểm tra lại địa chỉ Email</HelperText>
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                style={styles.input}
                right = {<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)}/>}
            />
            <HelperText type='error' visible={hasErrorPassword()}>Mật khẩu ít nhất phải 6 ký tự</HelperText>
            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                mode="outlined"
                secureTextEntry={!showPasswordConfirm}
                style={styles.input}
                 right = {<TextInput.Icon icon="eye" onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}/>}
            />
            <HelperText type='error' visible={hasErrorPasswordConfirm()}>Mật khẩu không trùng nhau</HelperText>
            <Button
                title="Register"
                disabled={hasErrorEmail() || hasErrorPassword() || hasErrorPasswordConfirm()}
                onPress={handleRegister}
            />
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

export default Register;
