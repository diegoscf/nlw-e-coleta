import React, {useEffect, useState} from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text, Linking, SafeAreaView } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as EscritorDeEmail from 'expo-mail-composer';

import api from '../../servicos/api';

interface ParametrosDeRota {
  ponto_id: number;
}

interface DadosDoPonto {
  ponto: {
    id: number;
    imagem: string;
    whatsapp: string;
    email: string;
    nome: string;
    uf: string;
    cidade: string;
  },
  itens: [{
    titulo: string
  }]
}

const Detalhe = () => {
  const mensagem = 'Interesse na coleta de resíduos';
  const navegacao = useNavigation();
  const rota = useRoute();

  const paramsDaRota = rota.params as ParametrosDeRota;

  const [dadosPonto, setDadosPonto] = useState<DadosDoPonto>({} as DadosDoPonto);

  useEffect(
    () => {
      api.get(`pontos/${paramsDaRota.ponto_id}`).then(resposta => setDadosPonto(resposta.data));
    },
    []
  );

  function navegarParaPonto() {
    navegacao.navigate('Ponto');
  }

  function enviarEmail() {
    EscritorDeEmail.composeAsync({
        subject: mensagem,
        recipients: [dadosPonto.ponto.email]
    });
  }

  function chamarNoWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=55${dadosPonto.ponto.whatsapp}&text=${mensagem}`);
  }

  if (!dadosPonto.ponto) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navegarParaPonto}>
          <Feather name="arrow-left" color="#34cb79" size={24} />
        </TouchableOpacity>
        <Image style={styles.pointImage} source={{uri: dadosPonto.ponto.imagem}}/>

        <Text style={styles.pointName}>{dadosPonto.ponto.nome}</Text>
        <Text style={styles.pointItems}>
          {dadosPonto.itens.map(item => item.titulo).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{dadosPonto.ponto.cidade}, {dadosPonto.ponto.uf}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={chamarNoWhatsApp}>
          <FontAwesome name="whatsapp" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={enviarEmail}>
          <Feather name="mail" color="#FFF" size={20} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    // paddingTop: 20,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    // paddingBottom: 0,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});


export default Detalhe;