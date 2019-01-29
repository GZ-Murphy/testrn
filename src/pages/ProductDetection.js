import React, { Component, PropTypes } from 'react'
import PureListView from '../components/PureListView'
import { connect } from 'react-redux'
import TopicsCarousel from './TopicsCarousel'
import Topic from './Topic'
import { genSubscribedData } from '../helper/dataHelper'
import AboutPage from './AboutPage'
import ProductButton from '../components/ProductButton'
import ListContainer from '../components/ListContainer'
import { EMPTY_CELL_HEIGHT } from '../components/ListContainer'
import ImgContainer from '../components/ImgContainer'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native'

import ImagePicker from 'react-native-image-picker';

const REQUEST_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/identifyquality';

const options = {
  title: 'Select Product Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EmptyPadding = Platform.OS === 'ios' ? EMPTY_CELL_HEIGHT : 0
class ProductDetection extends Component {
  state = {
    dataSource: null,
    result: null

  }

  render() {
    // let profilePicture = (
    //   <Image source={require('../assets/personal.png')}
    //     style={{height: 90, width: 90, borderRadius: 45}}
    //   />
    // )
    return (
      <ListContainer
        // title='我的订阅'
        // actionName='关于'
        androidTitle='Product'
        backgroundColor='#A8D769'>
        <ImgContainer
          data={this.state.dataSource}
          result={this.state.result}
          enableEmptySections
          // renderSectionHeader={this.renderSectionHeader}
          // renderRow={this.renderRow}
          renderEmptyView={this.renderEmptyView} />
      </ListContainer>
    )
  }

  renderEmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: EmptyPadding }}>
        {/* <Image source={require('../assets/no-topics-added.png')} /> */}
        <Text style={styles.message}>Product{'\n'}Detection</Text>
        <ProductButton style={{ width: 220, marginTop: 15 }} onPress={() => this.openImagePicker()} />
      </View>
    )
  }

  renderRow = (item, index, renderSeparator) => {
    return (
      <TouchableOpacity onPress={() => this.goToCarousel(item)}>
        <Topic topic={item} isSubscribed />
      </TouchableOpacity>
    )
  }

  openImagePicker = () => {
    if (this.avatarSeource) return;
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //response.data   
        this.setState({ dataSource: response.data, result: 'Loading...' })
        fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=o2R7BMU0ypaGn6YFnxYS5vwu&client_secret=F9ncrhSpssI2XIaSbkgw997ViTozAIG8').then((response) => response.json()).then(token => {
          //token.access_token

          fetch('https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/identifyquality?access_token='+token.access_token, {
            method: 'POST',
            body: JSON.stringify({ 'image': response.data }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.results[0].score>0.5){
                this.setState({result:responseJson.results[0].name})
              }else this.setState({result:'Unkown'})
            })


        })
      }
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
      <View key={dayName} style={{ backgroundColor: '#eeeeee' }}>
        <Text style={[{ margin: 6, marginLeft: 8 }, styles.font]}>{dayName}</Text>
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

module.exports = connect(mapStateToProps)(ProductDetection)
