import { createSwitchNavigator, createAppContainer } from "react-navigation"
import LoginStack from "./LoginStack"
import LoadingScreen from "../screens/loginflow/LoadingScreen"
import RootDrawerNavigator from './drawer'
const MainRoute = createSwitchNavigator({
    Loading: LoadingScreen,
    LoginStack: LoginStack,
    Navigator: RootDrawerNavigator,
},
{
    initialRouteName: 'Loading'
}
)

export default createAppContainer(MainRoute)