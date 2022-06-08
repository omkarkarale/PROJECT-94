import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

export default class CustomSideBarMenu extends Component{
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
      <View style={{flex:1, backgroundColor:this.state.light_theme?"white":"#15193c"}}>
        <Image source={require("../assets/logo.png")} style={styles.sideMenuProfile} />
        <DrawerContentScrollView{...props}>
          <DrawerItemList{...props}/>
        </DrawerContentScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sideMenuProfile: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(50),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: "contain",
  }
})