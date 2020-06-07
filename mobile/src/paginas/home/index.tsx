import React, {useState} from 'react';
import {Feather as Icon} from '@expo/vector-icons'; 
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import {RectButton, TextInput} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// import logo from '../../assets/logo.png';

const Home = () => {

    const navegacao = useNavigation();

    function navegarParaPonto() {
        navegacao.navigate('Ponto', {uf, cidade});
    }

    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
  
    return (
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={estilos.conteudo}
            imageStyle={{width: 274, height: 368}}
        >
            <View style={estilos.principal}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={estilos.titulo}>Seu marketplace de coleta de resíduos</Text>
                <Text style={estilos.descricao}>
                    Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                </Text>
            </View> 

            <View style={estilos.footer}>

                <Text>https://www.npmjs.com/package/react-native-picker-select</Text>
                <TextInput 
                    style={estilos.input}
                    placeholder="Digite a UF"
                    value={uf}
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    onChangeText={setUf} />
                <TextInput 
                    style={estilos.input}
                    placeholder="Digite a Cidade"
                    value={cidade}
                    autoCorrect={false}
                    onChangeText={setCidade} />

                <RectButton style={estilos.button} onPress={navegarParaPonto}>
                    <View style={estilos.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={estilos.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>

        </ImageBackground>
    );
}

const estilos = StyleSheet.create({
    conteudo: {
      flex: 1,
      padding: 32,
    //   backgroundColor: '#f0f0f5'
    },
  
    principal: {
      flex: 1,
      justifyContent: 'center',
    },
  
    titulo: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    descricao: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });


export default Home;