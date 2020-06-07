import React from 'react';
import {StatusBar} from 'react-native';
import {AppLoading} from 'expo';

import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';

// import Home from './src/paginas/home';
import Rotas from './src/rotas';

// nesse exemplo, é criado um elemento (view) à toa
// export default function App() {
//   return (
//     <View>
//       <StatusBar />
//       <Home />
//     </View>
//   );
// }

// com essa tag vazia, é criado um fragment 
export default function App() {
  const [fontesCarregadas] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontesCarregadas) {
    return <AppLoading />;
  }


  return (
    <>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent />
      <Rotas />
    </>
  );
}