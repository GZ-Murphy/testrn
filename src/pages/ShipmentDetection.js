import React, { Component, PropTypes } from 'react'
import PureListView from '../components/PureListView'
import {connect} from 'react-redux'
import TopicsCarousel from './TopicsCarousel'
import Topic from './Topic'
import {genSubscribedData} from '../helper/dataHelper'
import AboutPage from './AboutPage'
import SubscribeButton from '../components/SubscribeButton'
import ListContainer from '../components/ListContainer'
import {EMPTY_CELL_HEIGHT} from '../components/ListContainer'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native'

import {
  Navigator
} from 'react-native-deprecated-custom-components'
import ImagePicker from 'react-native-image-picker';
const options = {
  title: 'Select Shipment Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const EmptyPadding = Platform.OS === 'ios' ? EMPTY_CELL_HEIGHT : 0;
const REQUEST_URL = '';
var sections = [
    	  {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"},
        {"title" : "icon", "img" : "icon"},
        {"title" : "lufei", "img" : "lufei"}
];


class ShipmentDetection extends Component {
  state = {
    dataSource: null

  }
  // static propTypes = {
  //   navigator: PropTypes.object,
  //   days: PropTypes.array.isRequired,
  //   topics: PropTypes.object,
  //   updateTime: PropTypes.string,
  //   emptyOperation: PropTypes.func
  // };
  renderRow(rowData){
    return(
        <View style={styles.itemStyle}>
           
            <View style={styles.subItemStyle}>
                <Text style={{marginTop:5, fontSize:17}}>{rowData.title}</Text>
                <Text style={{marginBottom:5, fontSize:13, color:'green'}}>简介</Text>
            </View>
        </View>
    );
}
  render () {
    // let profilePicture = (
    //   <Image source={require('../assets/personal.png')}
    //     style={{height: 90, width: 90, borderRadius: 45}}
    //   />
    // )
    return (
      <ListContainer
      //  title='我的订阅'
        androidTitle='Shipment'
      // actionFunc={this.goToAbout}
      //  parallaxContent={profilePicture}
     //   backgroundImage={require('../assets/my-g8-background.png')}
        backgroundColor='#A8D769'>
        <PureListView data={this.state.dataSource}
          enableEmptySections
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow}
          renderEmptyView={this.renderEmptyView}/>
      </ListContainer>
    )
  }

  renderEmptyView = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: EmptyPadding}}>
        {/* <Image source={require('../assets/no-topics-added.png')} /> */}
        <Text style={styles.message}>Shipment{'\n'}Detection</Text>
        <SubscribeButton style={{width: 220, marginTop: 15}} onPress={()=>this.openImagePicker()}/>
      </View>
    )
  }

openImagePicker=()=>{
  if (this.avatarSource) return;
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      fetch(REQUEST_URL, {method: 'POST',body:  response.data }).then(res=>this.setState({dataSource: res}))
    }
  })
}

  renderRow = (info) => {
    var txt = ' ' + info.item.title;
    return (<Text key={info.index}
      style={{ flex: 1, height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
    )
  }

  goToAbout = () => {
    this.props.navigator.push({
      component: AboutPage,
      scene: Navigator.SceneConfigs.PushFromRight,
      updateTime: this.props.updateTime
    })
  }

  goToCarousel = (item) => {
    this.props.navigator.push({
      component: TopicsCarousel,
      day: this.props.days[item.dayId],
      topic: item
    })
  }

  renderSectionHeader = (dayData, dayName) => {
    if (dayData.length === 0) {
      return null
    }
    return (
      <View key={dayName} style={{backgroundColor: '#eeeeee'}}>
        <Text style={[{margin: 6, marginLeft: 8}, styles.font]}>{dayName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 12.5,
    color: '#555555'
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: '#7a8698'
  }
})

const mapStateToProps = state => ({
  days: state.data.days,
  updateTime: state.data.updateTime,
  topics: genSubscribedData(state.data.days, state.schedule.subscription)
})

module.exports = connect(mapStateToProps)(ShipmentDetection)
