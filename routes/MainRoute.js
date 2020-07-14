import { createSwitchNavigator, createAppContainer } from "react-navigation"
import FirstPage from "../screens/FirstPage"
import StudentMainRoute from "./StudentMainRoute"
import TeacherMainRoute from "./TeacherMainRoute"

const MainRoute = createSwitchNavigator({
    FirstPage: FirstPage,
    Student: StudentMainRoute,
    Teacher: TeacherMainRoute,
},
{
    initialRouteName: 'FirstPage'
}
)

export default createAppContainer(MainRoute)