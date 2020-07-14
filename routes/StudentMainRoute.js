import { createSwitchNavigator, createAppContainer } from "react-navigation"
import LoadingScreen from "../screens/LoadingScreen"
import StudentLoginStack from "./Student/StudentLoginStack"
import StudentRootDrawerNavigator from './Student/drawer'

const StudentMainRoute = createSwitchNavigator({
    Loading: LoadingScreen,
    LoginStack: StudentLoginStack,
    Navigator: StudentRootDrawerNavigator,
},
{
    initialRouteName: 'Loading'
}
)

export default createAppContainer(StudentMainRoute)