/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Schedule from './components.ios/environments/Schedule.ios.js';
import Info from './components.ios/environments/Info.ios.js';

class revconf2016 extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'schedule'
    }
  }

  render() {
    return (
      <TabBarIOS
        tintColor="#EA5455"
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          title="Schedule"
          selected={this.state.selectedTab === 'schedule'}
          iconSize={32}
          icon={require('./assets/img/watch.png')}
          onPress={()=>this.setState({selectedTab:'schedule'})}>
          <Schedule />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Notifications"
          selected={this.state.selectedTab === 'notifications'}
          icon={require('./assets/img/notifications.png')}
          onPress={()=>this.setState({selectedTab:'notifications'})}>
          <Info />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Info"
          selected={this.state.selectedTab === 'info'}
          icon={require('./assets/img/info.png')}
          onPress={()=>this.setState({selectedTab:'info'})}>
          <Info />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('revconf2016', () => revconf2016);
