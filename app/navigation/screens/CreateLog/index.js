import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {LOG_TYPES} from 'mylogs/app/constants';
import {useDispatch} from 'react-redux';
import ColorPalette from 'mylogs/app/components/ColorPalette';
import {createLog} from 'mylogs/app/redux/actions/logsActions';
import moment from 'moment';

const CreateLog = ({navigation}) => {
  DropDownPicker.setListMode('SCROLLVIEW');
  const [logName, setLogName] = useState('');
  const [logcolor, setLogcolor] = useState('808080');
  const [logDescription, setLogDescription] = useState('');
  // Log type
  const [logTypeOpen, setLogTypeOpen] = useState(false);
  const [logTypeValue, setLogTypeValue] = useState(null);
  const [logTypeItems, setLogTypeItems] = useState(LOG_TYPES);

  const [logNameValid, setLogNameValid] = useState(true);
  const [logTypeValid, setLogTypeValid] = useState(true);

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
      <Text style={styles.pageTitle}>Create Log</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <TextInput
            error={!logNameValid}
            style={styles.inputItem}
            label="Name"
            mode="outlined"
            placeholder="Enter log name"
            value={logName}
            onChangeText={text => {
              setLogNameValid(text.length > 0);
              setLogName(text);
            }}></TextInput>
          <TextInput
            style={styles.inputItem}
            label="Description"
            mode="outlined"
            placeholder="Enter description for log"
            value={logDescription}
            onChangeText={text => setLogDescription(text)}></TextInput>
          <DropDownPicker
            onChangeValue={value => {
              if (value) setLogTypeValid(true);
            }}
            textStyle={styles.typeDropdownText}
            placeholder="Select log type"
            style={[
              styles.inputItem,
              styles.typeDropdown,
              logTypeValid ? null : {borderColor: '#b00000', borderWidth: 2},
            ]}
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
              let error = false;
              if (!logTypeValue) {
                setLogTypeValid(false);
                error = true;
              }
              if (!logName) {
                setLogNameValid(false);
                error = true;
              }
              if (error === true) return;
              dispatch(
                createLog({
                  name: logName,
                  description: logDescription,
                  color: logcolor,
                  type: logTypeValue,
                  reminder: 'Daily',
                  creation_date: moment.now(),
                }),
              ).then(() => {
                navigation.goBack();
              });
            }}>
            Create
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateLog;
