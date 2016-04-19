'use strict';

var React = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  View
  } = React;

var NUM_ITEMS = 20;

var ScrollViewSimpleExample = React.createClass({
  statics: {
    title: '<ScrollView>',
    description: 'Component that enables scrolling through child components.'
  },
  makeItems: function(nItems: number, styles): Array<any> {
    var items = [];
    for (var i = 0; i < nItems; i++) {
      items[i] = (
        <View key={i} style={styles}>
          <Text>{'Item ' + i}</Text>
        </View>
      );
    }
    return items;
  },

  render: function() {
    // One of the items is a horizontal scroll view
    var items = this.makeItems(NUM_ITEMS, styles.itemWrapper);
    items[4] = (
      <ScrollView key={'scrollView'} horizontal={true}>
        {this.makeItems(NUM_ITEMS, [styles.itemWrapper, styles.horizontalItemWrapper])}
      </ScrollView>
    );

    var verticalScrollView = (
      <ScrollView style={styles.verticalScrollView}>
        {items}
      </ScrollView>
    );

    return verticalScrollView;
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

module.exports = ScrollViewSimpleExample;
