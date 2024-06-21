import { Redirect, Route, useLocation } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from '../pages/Home';
import NewHabit from '../pages/NewHabit';
import Tab3 from '../pages/Tab3';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import '../theme/variables.css';

setupIonicReact();

const Tabs: React.FC = () => {
    return (
        <IonTabs >
            <IonRouterOutlet>
                <Route exact path="/app/home">
                    <Home habits={5} />
                </Route>
                <Route path="/app/tab3" component={Tab3} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon aria-hidden="true" icon={ellipse} />
                            <IonLabel>Tab 2</IonLabel>
                        </IonTabButton> */}
                <IonTabButton tab="tab3" href="/app/tab3">
                    <IonIcon aria-hidden="true" icon={square} />
                    <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs >
    )
};

export default Tabs;
