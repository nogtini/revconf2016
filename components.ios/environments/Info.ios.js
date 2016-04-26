'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View
  } = React;

var InfoView = React.createClass({
  render: function() {
    return (
      <ScrollView>
        <StatusBar
          hidden={true} />
        <View style={styles.container}>
          <Text style={styles.banner}>RevolutionConf Code Of Conduct</Text>
          <Text style={styles.bodyCopy}>All attendees, speakers, sponsors and volunteers at RevolutionConf are required to agree with the following code of conduct. Organizers will enforce this code throughout the event. We are expecting cooperation from all participants to help ensuring a safe environment for everybody.</Text>
          <Text style={styles.header}>Need Help?</Text>
          <Text style={styles.bodyCopy}>This conference is co-organized by Linda, Kevin, and Erik. You should have our contact details in the emails we’ve sent prior to the event or you can email all organizers at team@revolutionconf.com.</Text>
          <Text style={styles.header}>The Quick Version</Text>
          <Text style={styles.bodyCopy}>RevolutionConf is dedicated to providing a harassment-free conference experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of conference participants in any form. Sexual language and imagery is not appropriate for any conference venue, including talks, workshops, parties, Twitter and other online media. Conference participants violating these rules may be sanctioned or expelled from the conference without a refund at the discretion of the conference organizers.</Text>
          <Text>The Less Quick Version</Text>
          <Text>
            Harassment includes offensive verbal comments related to gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, ethnicity, religion, technology choices, sexual images in public spaces, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention.</Text>
          <Text style={styles.newParagraph}>
            Participants asked to stop any harassing behavior are expected to comply immediately.</Text>
          <Text style={styles.newParagraph}>
            Sponsors are also subject to the anti-harassment policy. In particular, sponsors should not use sexualized images, activities, or other material. Booth staff (including volunteers) should not use sexualized clothing/uniforms/costumes, or otherwise create a sexualized environment.</Text>
          <Text style={styles.newParagraph}>
            If a participant engages in harassing behavior, the conference organizers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund.</Text>
          <Text style={styles.newParagraph}>
            If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of the staff immediately. RevolutionConf staff can be identified as they’ll be wearing red t-shirts.</Text>
          <Text style={styles.newParagraph}>
            RevolutionConf staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing harassment to feel safe for the duration of the conference. We value your attendance.</Text>
          <Text style={styles.newParagraph}>
            We expect participants to follow these rules at RevolutionConf venues and conference-related social events.
          </Text>
        </View>
      </ScrollView>
    );
  }
});

const {width, height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    margin: width/12
  },
  banner: {
    color: '#FD444E',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  header: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bodyCopy: {

  },
  newParagraph: {
    marginTop: 7
  }
});

module.exports = InfoView;
