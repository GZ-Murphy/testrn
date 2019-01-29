import React, {PropTypes} from 'react'
import TabNavigator from 'react-native-tab-navigator'
import ProductDetection from './ProductDetection'
import ShipmentDetection from './ShipmentDetection'

import {
	Image,
	StyleSheet
} from 'react-native'

const SCHEDULE_IMAGES = [
  {
    active: require('../assets/schedule-23-active.png'),
    inactive: require('../assets/schedule-23.png')
  },
  {
    active: require('../assets/schedule-24-active.png'),
    inactive: require('../assets/schedule-24.png')
  }
]
export default class extends React.Component {
  // static propTypes = {
  //   navigator: PropTypes.object,
  //   user: PropTypes.object
  // };

  state={
    selectedTab: 'ShipmentDetection',
    selectedSegment: 0
  }

  render () {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ShipmentDetection'}
          title='Form'
          selectedTitleStyle={{color: '#032250'}}
          renderIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].inactive} style={styles.icon} />}
          renderSelectedIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].active} style={styles.icon} />}
          onPress={() => this.setState({ selectedTab: 'ShipmentDetection' })}>
          <ShipmentDetection
            navigator={this.props.navigator}
            onSegmentSelected={this.onSegmentSelected}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ProductDetection'}
          title='Quality'
          selectedTitleStyle={{color: '#032250'}}
          renderIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].inactive} style={styles.icon} />}
          renderSelectedIcon={() => <Image source={SCHEDULE_IMAGES[this.state.selectedSegment].active} style={styles.icon} />}
          onPress={() => this.setState({ selectedTab: 'ProductDetection' })}>
          <ProductDetection navigator={this.props.navigator} emptyOperation={this.goHome}/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  goHome = () => {
    this.setState({
      selectedTab: 'ShipmentDetection'
    })
  };

  onSegmentSelected = (selectedSegment) => {
    this.setState({
      selectedSegment
    })
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28
  }
})
