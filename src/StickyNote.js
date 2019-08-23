import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import moment from 'moment';
import { Card, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PickerSelect from 'react-native-picker-select';


export default class StickyNote extends Component {
  state = {
    isDateTimePickerVisible: false,
    limitDateTime: moment().format('YYYY年MM月DD日 HH時mm分'),
    CardStyle:styles.card,
    size:1,
    Title:"",
    Content:"",
    Tag:0
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  setDateTime = dateTime => {
    this.props.setDateTime(this.props.uuid, dateTime);
    this.setState({
      limitDateTime: moment(dateTime).format('YYYY年MM月DD日 HH時mm分'),
    });
  }

  render() {
    return (
      <Card
        containerStyle={this.state.CardStyle}
        title={
          <View>
            <TextInput
              placeholder="タイトルを入力"
              placeholderTextColor="#7c7c7c"
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
        }>
        <Button
          title="✖"
          buttonStyle={styles.deleteButton}
          onPress={() => this.props.deleteStickyNote(this.props.uuid)}
        />
        <Button
          title="△"
          buttonStyle={styles.resizeButton}
          //onPress={() => this.resize()}
        />
        <TextInput
          placeholder="内容を入力"
          placeholderTextColor="#7c7c7c"
          multiline
          style={styles.contentTextInput}
          underlineColorAndroid={'rgba(0,0,0,0)'}
        />
        <View style={styles.datetimeContainer}>
          <Text>期限：</Text>
          <Text onPress={this.showDateTimePicker}>
            {this.state.limitDateTime}
          </Text>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          mode={'datetime'}
          onConfirm={dateTime => {
            this.setDateTime(dateTime);
            this.hideDateTimePicker();
          }}
          onCancel={this.hideDateTimePicker}
        />
        <PickerSelect
            onValueChange={ (value) => {
              this.setState({Tag : value});
              switch (value){
                case 1:
                  this.setState({CardStyle:styles.schoolcard})
                  break;
                case 2:
                  this.setState({CardStyle:styles.bytecard})
                  break;
                case 3:
                  this.setState({CardStyle:styles.importantcard})
                  break;
                case 4:
                  this.setState({CardStyle:styles.lovecard})
                  break;
                default:
                  this.setState({CardStyle:styles.card})
              }
              
              }
            }
            
            items={this.props.Tags}
        />
      </Card>
    );
  }
}
const resize = () =>{
  this.setState({size:(this.state.size+1)%2})
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f99a',
  },
  schoolcard: {
    backgroundColor: '#00bfff',
  },
  bytecard: {
    backgroundColor: '#778899',
  },
  importantcard: {
    backgroundColor: '#ff6347',
  },
  lovecard: {
    backgroundColor: '#ff99ff'},
  deleteButton: {
    backgroundColor: '#EFD032',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 30,
    width: 30,
    borderRadius: 30
  },
   resizeButton: {
    backgroundColor: '#EFD032',
    position: 'absolute',
    bottom: 0,
    right: 40,
    height: 30,
    width: 30,
    borderRadius: 30
  },
  datetimeContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
});
