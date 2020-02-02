import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Home from './pages/Home';
import Index from './pages/Index';
import Identificator from './pages/Identificator';
import Cozinha from './pages/Cozinha';
import LeituraQrCode from './pages/LeituraQrCode';
import ListaItens from './pages/ListaItens';
import Configs from './pages/Configs';


const Routes = createAppContainer(
    createSwitchNavigator({
        Index,
        Home,
        Identificator,
        Cozinha,
        LeituraQrCode,
        ListaItens,
        Configs

    })
);


export default Routes;