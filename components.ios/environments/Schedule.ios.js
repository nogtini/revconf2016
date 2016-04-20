'use strict';

var React = require('react-native');
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

var THUMB_URLS = [
  require('./Thumbnails/like.png'),
  require('./Thumbnails/dislike.png'),
  require('./Thumbnails/call.png'),
  require('./Thumbnails/fist.png'),
  require('./Thumbnails/bandaged.png'),
  require('./Thumbnails/flowers.png'),
  require('./Thumbnails/heart.png'),
  require('./Thumbnails/liking.png'),
  require('./Thumbnails/party.png'),
  require('./Thumbnails/poke.png'),
  require('./Thumbnails/superlike.png'),
  require('./Thumbnails/victory.png'),
];
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
      thumbIndex: this._getThumbIdx(),
      dir: 'row'
    };
  },
  componentWillMount: function() {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  },
  _getThumbIdx: function() {
    return Math.floor(Math.random() * THUMB_URLS.length);
  },
  _onPressThumb: function() {
    this.setState({
      thumbIndex: this._getThumbIdx(),
      dir: this.state.dir === 'row' ? 'column' : 'row',
    });
  },
  render: function() {
    return (
      <TouchableOpacity
        onPress={this._onPressThumb}
        style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
        <Text style={styles.buttonText}>Hey there hi there</Text>
        <Image style={styles.img} source={THUMB_URLS[this.state.thumbIndex]} />
      </TouchableOpacity>
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
      animated: true,
      modalVisible: false,
      transparent: false
    };
  },

  renderRow: function(rowData: string, sectionID: string, rowID: string): ReactElement {
    return (<Thumb text={rowData}/>);
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

  renderHeader: function() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <View>
        <StatusBar
          hidden={true} />
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
        <TouchableOpacity onPress={this._setModalVisible.bind(this, true)} style={styles.header}>
          <View>
            <Text style={[styles.text, styles.headerText]}>
              Schedule
            </Text>
          </View>
        </TouchableOpacity>
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

var styles = StyleSheet.create({
  listview: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EA5455',
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F4F7',
    padding: 15,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  img: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
  },
  section: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
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
    fontWeight: '300'
  }
});

module.exports = ListViewPagingExample;
