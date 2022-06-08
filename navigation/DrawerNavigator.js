import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/LogOut";
import firebase from 'firebase';
import CustomSideBarMenu from "../screens/customsidebarmenu";

const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={StackNavigator} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="Logout" component={Logout} />
//     </Drawer.Navigator>
//   );
// };

export default class DrawerNavigator extends Component{
  constructor(props){
    super(props);
    this.status={
      light_theme: true,
    }
  }

  componentDidMount(){
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  }

  render(){
    let props = this.props;
    return(
      <Drawer.Navigator drawerContentOptions = {{activeTintColor: "orange", inactiveTintColor: this.state.light_theme? "black" : "white", itemStyle: {marginVertical: 5}}} drawerContent = {props=><CustomSideBarMenu{...props}/>} >
        <Drawer.Screen name="Home" component={StackNavigator} options={{unMountOnBlur:true}} />
        <Drawer.Screen name="Profile" component={Profile} options={{unMountOnBlur:true}} />
        <Drawer.Screen name="Logout" component={Logout} options={{unMountOnBlur:true}} />
      </Drawer.Navigator>
    )
  }
}

