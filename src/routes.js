import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Home from './pages/Home';
import Identificator from './pages/Identificator';
import Cozinha from './pages/Cozinha';
import LeituraQrCode from './pages/LeituraQrCode';
import ListaItens from './pages/ListaItens';



const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Identificator,
        Cozinha,
        LeituraQrCode,
        ListaItens,
        
    })
);


export default Routes;