import * as React from 'react';
import { View,KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native';
import StickyNote from './StickyNote';
import uuidv4 from 'uuid/v4'
import { Button } from 'react-native-elements';
import PickerSelect from 'react-native-picker-select';
import moment from 'moment';

export default class App extends React.Component {

  state = {
    StickyNoteList: [],
    Style: styles.whiteContainer,
    Tags:  [
                { label: '学校', value: 1 },
                { label: 'バイト', value: 2 },
                { label: '重要', value: 3  },
                { label: 'デート', value: 4  }
            ],
    Test: "ダミー"
  };

  setDateTime = (uuid, dateTime) => {
    var newList = this.state.StickyNoteList;
    newList.find(note => note.component.key === uuid).limitDateTime = dateTime;
    this.setState({ StickyNoteList: newList });
  }

  deleteStickyNote = uuid => {
    const stickyNoteList = this.state.StickyNoteList;
    const newList = stickyNoteList.filter(note => note.component.key != uuid);
    this.setState({ StickyNoteList: newList });
    
  }

  addStickyNote = () => {
    const stickyNoteList = this.state.StickyNoteList;
    const uuid = uuidv4();
    
    stickyNoteList.sort((val1,val2)=>val1.limitDateTime-val2.limitDateTime)
    stickyNoteList.push({
      component: <StickyNote key={uuid} uuid={uuid} deleteStickyNote={this.deleteStickyNote} Tags={this.state.Tags} setDateTime={this.setDateTime}/>,
      limitDateTime: moment(),
    });
    this.setState({ StickyNoteList: stickyNoteList});
  }
  /*
  addTags = () => {
    const Tags = this.state.Tags;
    const uuid = uuidv4();
    stickyNoteList.push(
     {label: 'de-to',value:uuid}
    );
    this.setState({ StickyNoteList: stickyNoteList });
  }*/
  

  render() {
    return (
      <View>
        <KeyboardAvoidingView style={this.state.Style} behavior="padding">
          <PickerSelect
              onValueChange={ (value) => this.setState({ Style:value})}
              items={[
                  { label: 'しろ', value: styles.whiteContainer },
                  { label: 'くろ', value: styles.blackContainer }
              ]}
          />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {this.state.StickyNoteList.map(note => note.component)}
          </ScrollView>
        
        </KeyboardAvoidingView>
        <Button
          title="＋"
          onPress={this.addStickyNote}
          buttonStyle={styles.addButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteContainer: {
    height: '100%',
    backgroundColor: '#ffffff'
  },
  blackContainer: {
    height: '100%',
    backgroundColor: '#000000'
  },
  scrollContainer: {
    marginTop: 10,
    paddingBottom: 20
  },
  addButton: {
    width: 50,
    height: 50,
    left: 20,
    bottom: 20,
    position: 'absolute',
    //borderRadius: 50,
  },
});
