import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  StyleSheet,
  Text
} from 'react-native'
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#eee'
  },
  itemStyle: {
    // 主轴方向
    flexDirection: 'row',
    // 下边框
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },

  imageStyle: {
    // 尺寸
    width: 60,
    height: 60,
    // 边距
    marginLeft: 10,
    margin: 10
  },

  subItemStyle: {
    // 对齐方式
    justifyContent: 'space-around'
  }
});
const dataSource = new ListView.DataSource({
  getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
  getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

export default class extends Component {

  // static propTypes = {
  //   data: PropTypes.any,
  //   needSeparator: PropTypes.bool,
  //   renderEmptyView: PropTypes.func
  // };

  static defaultProps = {
    needSeparator: true
  }

  constructor(props) {
    super(props)
    this.length = 0
    this.state = {
      dataSource: this.cloneWithData(dataSource, props.data)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: this.cloneWithData(this.state.dataSource, nextProps.data)
      })
    }
  }

  render() {
    const { renderEmptyView } = this.props
    return (
      this.length > 0
        ? <ListView
           {...this.props}
          ref='listview'
          initialListSize={10}
          pageSize={10}
          removeClippedSubviews={false}
          renderSeparator={this.renderSeparator}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        : (renderEmptyView ? renderEmptyView() : null)
    )
  }

  scrollTo(...args: Array<any>) {
    this.refs.listview.scrollTo(...args)
  }

  getScrollResponder(): any {
    return this.refs.listview.getScrollResponder()
  }

  cloneWithData(dataSource, data) {
    if (!data) {
      this.length = 0
      return dataSource.cloneWithRows([])
    }
    if (Array.isArray(data)) {
      this.length = data.length
      return dataSource.cloneWithRows(data)
    }
    this.length = 0
    for (let day in data) {
      this.length += data[day].length
    }
    return dataSource.cloneWithRowsAndSections(data)
  }
  renderRow = (rowData) => {
    return (
      <View style={styles.itemStyle}>
        <View style={styles.subItemStyle}>
          <Text style={{ marginTop: 5, fontSize: 17 }}>{rowData.title}</Text>
          <Text style={{ marginBottom: 5, fontSize: 13, color: 'green' }}>简介</Text>
        </View>
      </View>
    );
  }
  
  renderSeparator = (sectionID, rowID) =>{
    return this.props.needSeparator && <View key={`${sectionID}vs${rowID}`} style={styles.separator} />
  }
    

}

