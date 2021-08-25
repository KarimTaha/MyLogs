import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {LOG_TYPES} from 'mylogs/app/constants';
import {useDispatch} from 'react-redux';
import ColorPalette from 'mylogs/app/components/ColorPalette';
import {editLog} from 'mylogs/app/redux/actions/logsActions';

const EditLog = ({navigation, route}) => {
  const originalItem = route.params.item;
  DropDownPicker.setListMode('SCROLLVIEW');
  const [logName, setLogName] = useState(originalItem.name);
  const [logcolor, setLogcolor] = useState(originalItem.color);
  const [logDescription, setLogDescription] = useState(
    originalItem.description,
  );
  // Log type
  const [logTypeOpen, setLogTypeOpen] = useState(false);
  const [logTypeValue, setLogTypeValue] = useState(originalItem.type);
  const [logTypeItems, setLogTypeItems] = useState(LOG_TYPES);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <Text style={styles.pageTitle}>Edit Log</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <TextInput
            style={styles.inputItem}
            label="Name"
            mode="outlined"
            placeholder="Enter log name"
            value={logName}
            onChangeText={text => setLogName(text)}></TextInput>
          <TextInput
            style={styles.inputItem}
            label="Description"
            mode="outlined"
            placeholder="Enter description for log"
            value={logDescription}
            onChangeText={text => setLogDescription(text)}></TextInput>
          <DropDownPicker
            textStyle={styles.typeDropdownText}
            placeholder="Select log type"
            style={[styles.inputItem, styles.typeDropdown]}
            open={logTypeOpen}
            value={logTypeValue}
            items={logTypeItems}
            setOpen={setLogTypeOpen}
            setValue={setLogTypeValue}
            setItems={setLogTypeItems}
          />
          <ColorPalette selectedColor={logcolor} onColorPressed={setLogcolor} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            color="#191e52"
            mode="contained"
            style={styles.button}
            onPress={() => {
              // console.log(`name = ${logName},
              // description = ${logDescription}`)
              dispatch(
                editLog({
                  id: originalItem.id,
                  name: logName,
                  description: logDescription,
                  color: logcolor,
                  type: logTypeValue,
                  reminder: 'Daily',
                  creation_date: new Date(Date.now()).toLocaleString('en-EG', {
                    timeZone: 'CAT',
                  }),
                }),
              ).then(() => {
                navigation.goBack();
              });
            }}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditLog;
