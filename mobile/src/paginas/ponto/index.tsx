import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import { RectButton, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';
// assim traz todas as funções disponíveis

import api from '../../servicos/api';

interface Item {
  id: number;
  titulo: string;
  img_url: string;
}

interface PontoColeta {
  id: number;
  nome: string;
  imagem: string;
  img_url: string;
  whatsapp: string;
  email: string;
  uf: string;
  cidade: string;
  lat: number;
  long: number;
}

interface ParametrosDeRota {
  uf: string;
  cidade: string;
}

const Ponto = () => {
  const navegacao = useNavigation();
  const rota = useRoute();

  const paramsDaRota = rota.params as ParametrosDeRota;

  const [itens, setItens] = useState<Item[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
  const [pontos, setPontos] = useState<PontoColeta[]>([]);

  const [pontoMapaInicial, setPontoMapaInicial] = useState<[number, number]>([0, 0]);
  
  useEffect(
    () => {
      async function carregarPosicaoNoMapa() {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert('Seu telefone está sem permissão de localização');
          return;
        }

        const localizacao = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = localizacao.coords;

        setPontoMapaInicial([latitude, longitude]);
      }
      carregarPosicaoNoMapa();
    },
    []
  );

  useEffect(
    () => {
      api.get('itens').then(resposta => setItens(resposta.data));
    }, 
    []
  );

  useEffect(
    () => {
      api.get('pontos', {
        params: {
          uf: paramsDaRota.uf,
          cidade: paramsDaRota.cidade,
          itens: itensSelecionados,
        }
      }).then(resposta => setPontos(resposta.data));
    }, 
    [itensSelecionados]
  );

  function navegarParaHome() {
    navegacao.navigate('Home');
  }

  function navegarParaDetalhe(id: number) {
    navegacao.navigate('Detalhe', { ponto_id: id });
  }

  function armazenarItensSelecionados(itemId: number) {
    const jaSelecionado = itensSelecionados.filter(id => id === itemId);

    if (jaSelecionado.length) {
      setItensSelecionados(itensSelecionados.filter(id => id !== itemId));
    } else {
      setItensSelecionados([...itensSelecionados, itemId]);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={navegarParaHome}>
          <Icon name="arrow-left" color="#34cb79" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.description}>Encontre no mapa um Ponto de Coleta</Text>

        <View style={styles.mapContainer}>
          {pontoMapaInicial[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={pontoMapaInicial[0] === 0}
              initialRegion={{
                latitude: pontoMapaInicial[0],
                longitude: pontoMapaInicial[1],
                // latitude: -15.8618698,
                // longitude: -48.0307621,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {pontos.map(ponto => (
                <Marker
                  key={String(ponto.id)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: ponto.lat,
                    longitude: ponto.long
                  }}
                  onPress={() => navegarParaDetalhe(ponto.id)}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: ponto.img_url }} />
                    <Text style={styles.mapMarkerTitle}>{ponto.nome}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20
          }}
        >
          {itens.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                itensSelecionados.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => armazenarItensSelecionados(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.img_url} />
              <Text style={styles.itemTitle}>{item.titulo}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});


export default Ponto;