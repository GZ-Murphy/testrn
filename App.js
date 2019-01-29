/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Image, StyleSheet, Text, TouchableOpacity, View, SectionList, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

var sections = [
  { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
  { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
  { key: "C", data: [{ title: "成吉思汗" }, { title: "超市快递" }] },
  { key: "W", data: [{ title: "王磊" }, { title: "王者荣耀" }, { title: "往事不能回味" }, { title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
];



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default class App extends Component {
  state = {
    avatarSource: null,
    dataSource: null

  }
  constructor(props) {
    super(props);
  }
  _renderItem = (info) => {
    var txt = '  ' + info.item.title;
    
    return <Text key={info.index}
      style={{ flex: 1, height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
  }

  // _sectionComp = (info) => {
  //   var txt = info.section.key;
  //   return <Text
  //     style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
  // }
  selectPhotoTapped() {
    if (this.avatarSource) return;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        alert('fuck me')
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.setState({
          avatarSource: source,
        })
      }
    });
  }
  render() {
    return (
      <View>

        <View style={{ height: 45 ,flex:1}}>
          <Text>这是吸顶的导航 (一定要固定高度),</Text>
        </View>
        {/* <ScrollView> */}

          {
            this.state.avatarSource !== null ?
              <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={[styles.avatar, styles.avatarContainer]}><Text>选择照片</Text></View>
                </TouchableOpacity>
              </View>:
              <View style={[styles.avatar, styles.avatarContainer]}>
                <SectionList
                  renderItem={this._renderItem}
                  sections={sections}
                  ItemSeparatorComponent={() => <View><Text></Text></View>}
                />
              </View>
          }

        {/* </ScrollView> */}
        <View style={{ height: 45 ,position: 'absolute', left: 0, right: 0, bottom: 0}}>
          <Text>这是底部的tabBar (也是一定要固定高度),</Text>
        </View>
      </View>
    )
  }

}



