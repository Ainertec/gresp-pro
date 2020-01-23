import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Home from './pages/Home';
import Index from './pages/Index';
import Identificator from './pages/Identificator';

const Routes = createAppContainer(
    createSwitchNavigator({
        Index,
        Home,
        Identificator

    })
);


export default Routes;