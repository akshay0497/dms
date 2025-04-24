import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { login } from '../redux/actions/authActions';
import { useTranslation } from 'react-i18next';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../navigations/DrawerNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LoginScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const { colors, isDarkMode } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: ''
    };

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
      newErrors.username = 'Username must be 3-20 characters and alphanumeric';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(login(username, password));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background.default }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.contentContainer}>
                  <View style={styles.logoContainer}>
                    <Image 
                      source={{ uri: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                    <Text style={styles.appName}>
                      Document Management System
                    </Text>
                    <Text style={styles.tagline}>
                      {t('Secure. Efficient. Organized.')}
                    </Text>
                  </View>

                  <View style={styles.formContainer}>
                    <Text style={styles.welcomeText}>
                      {t('Welcome Back')}
                    </Text>
                    <Text style={styles.loginText}>
                      {t('Please login to access your documents')}
                    </Text>

                    <View style={styles.inputContainer}>
                      <Icon 
                        name="account" 
                        size={20} 
                        color={colors.text.secondary}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[
                          styles.input, 
                          { 
                            backgroundColor: colors.background.paper,
                            color: colors.text.primary,
                            borderColor: errors.username ? colors.error.main : colors.border.main
                          }
                        ]}
                        placeholder={t('Username')}
                        placeholderTextColor={colors.text.secondary}
                        value={username}
                        onChangeText={(text) => {
                          setUsername(text);
                          setErrors(prev => ({ ...prev, username: '' }));
                        }}
                        autoCapitalize="none"
                        editable={!isLoading}
                      />
                    </View>
                    {errors.username ? (
                      <Text style={[styles.errorText, { color: colors.error.main }]}>
                        {errors.username}
                      </Text>
                    ) : null}

                    <View style={styles.inputContainer}>
                      <Icon 
                        name="lock" 
                        size={20} 
                        color={colors.text.secondary}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[
                          styles.input, 
                          { 
                            backgroundColor: colors.background.paper,
                            color: colors.text.primary,
                            borderColor: errors.password ? colors.error.main : colors.border.main
                          }
                        ]}
                        placeholder={t('Password')}
                        placeholderTextColor={colors.text.secondary}
                        value={password}
                        onChangeText={(text) => {
                          setPassword(text);
                          setErrors(prev => ({ ...prev, password: '' }));
                        }}
                        secureTextEntry={!showPassword}
                        editable={!isLoading}
                      />
                      <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                      >
                        <Icon 
                          name={showPassword ? "eye-off" : "eye"} 
                          size={20} 
                          color={colors.text.secondary}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password ? (
                      <Text style={[styles.errorText, { color: colors.error.main }]}>
                        {errors.password}
                      </Text>
                    ) : null}

                    <TouchableOpacity
                      style={[
                        styles.button, 
                        { 
                          backgroundColor: colors.primary.main,
                          opacity: isLoading ? 0.7 : 1
                        }
                      ]}
                      onPress={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={colors.primary.contrast} />
                      ) : (
                        <Text style={[styles.buttonText, { color: colors.primary.contrast }]}>
                          {t('Login')}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '90%',
    maxWidth: 400,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 2, 0.9)',
    marginBottom: 5,
  },
  loginText: {
    fontSize: 16,
    color: 'rgba(85, 28, 198, 0.44)',
    opacity: 0.9,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 45,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 12,
  },
}); 