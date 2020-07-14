import { createSwitchNavigator, createAppContainer } from "react-navigation"
import LoadingScreen from "../screens/LoadingScreen"
import TeacherLoginStack from "./Teacher/TeacherLoginStack"
import TeacherRootDrawerNavigator from './Teacher/drawer'

const TeacherMainRoute = createSwitchNavigator({
    Loading: LoadingScreen,
    LoginStack: TeacherLoginStack,
    Navigator: TeacherRootDrawerNavigator,
},
{
    initialRouteName: 'Loading'
}
)

export default createAppContainer(TeacherMainRoute)