'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  TouchableHighlight
  } = React;

var NativeModules = require('NativeModules');
var {
  UIManager,
  } = NativeModules;

var NUM_SECTIONS = 10;
var NUM_ROWS_PER_SECTION = 1;

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
        <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var Thumb = React.createClass({
  getInitialState: function() {
    return {
      animated: true,
      modalVisible: false,
      transparent: false
    }
  },

  //Modal stuff
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  _toggleAnimated() {
    this.setState({animated: !this.state.animated});
  },

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  },

  componentWillMount: function() {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  },
  render: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <View>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={this._setModalVisible.bind(this, true)}
          style={[styles.buttonContents]}>
          <View>
            <Text style={styles.buttonText}>Hey there hi there Hey there hi there Hey there hi there Hey there hi there </Text>
            <Text style={styles.roomText}>VIRGINIA</Text>
          </View>
          <Image style={styles.img} source={require('../../assets/img/pic.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.null}
          style={[styles.buttonContents]}>
          <View>
            <Text style={styles.buttonText}>Hey there hi there </Text>
            <Text style={styles.roomText}>VIRGINIA</Text>
          </View>
          <Image style={styles.img} source={require('../../assets/img/pic.png')} />
        </TouchableOpacity>
        </View>
    );
  }
});

var ListViewPagingExample = React.createClass({
  statics: {
    title: '<ListView> - Paging',
    description: 'Floating headers & layout animations.'
  },

  getInitialState: function() {
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };

    var dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];
    for (var ii = 0; ii < NUM_SECTIONS; ii++) {
      var sectionName = '10:0' + ii + ' AM';
      sectionIDs.push(sectionName);
      dataBlob[sectionName] = sectionName;
      rowIDs[ii] = [];

      for (var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        var rowName = 'S' + ii + ', R' + jj;
        rowIDs[ii].push(rowName);
        dataBlob[rowName] = rowName;
      }
    }
    return {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      headerPressCount: 0,
    };
  },

  renderRow: function(rowData: string, sectionID: string, rowID: string): ReactElement {
    return (
      <Thumb text={rowData}/>
    );
  },

  renderSectionHeader: function(sectionData: string, sectionID: string) {
    return (
      <View style={styles.section}>
        <Text style={[styles.text, styles.sectionText]}>
          {sectionData}
        </Text>
      </View>
    );
  },

  renderHeader: function() {
    return (
      <View>
        <StatusBar
          hidden={true} />
        <View style={styles.header}>
            <View style={styles.bgImageWrapper}>
              <Image style={styles.bgImage} source={require('../../assets/img/background.png')}>
                <Text style={[styles.text, styles.headerText]}>
                  Schedule
                </Text>
              </Image>
            </View>
        </View>
      </View>
    );
  },

  render: function() {
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
        scrollRenderAheadDistance={500}
      />
    );
  },

  _onPressHeader: function() {
    this.setState({headerPressCount: this.state.headerPressCount + 1});
  },

});

const {width} = Dimensions.get('window');
const headerHeight = width*2/3;

var styles = StyleSheet.create({
  listview: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 8,
  },
  rowText: {
    color: '#888888',
  },
  thumbText: {
    fontSize: 20,
    color: '#888888',
  },
  buttonContents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F4F7',
    padding: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  img: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    paddingVertical: 3,
    backgroundColor: '#F0F4F7',
  },
  sectionText: {
    fontSize: 10,
    color: '#7F7F7F',
    fontWeight: '500'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#222831',
    fontWeight: '300',
    width: width/3*2
  },
  roomText: {
    fontSize: 10,
    paddingTop: 5,
    color: '#EA5455'
  },
  bgImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    resizeMode: "stretch",
    width: width,
    height: headerHeight
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
});

module.exports = ListViewPagingExample;
