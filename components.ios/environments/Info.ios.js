'use strict';

var React = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar
  } = React;

var InfoView = React.createClass({
  render: function() {
    return (
      <View>
        <StatusBar
          hidden={true} />
        <View></View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    borderTopWidth: 5,
    borderColor: '#a52a2a',
    padding: 30,
  },
});

module.exports = InfoView;
