import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {LOG_TYPES} from 'mylogs/app/constants';

const CreateLog = ({navigation}) => {
  // Log type
  const [typeOpen, setTypeOpen] = useState(false);
  const [typeValue, setTypeValue] = useState(null);
  const [typeItems, setTypeItems] = useState(LOG_TYPES);

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
            style={styles.inputItem}
            label="Name"
            mode="outlined"
            placeholder="Enter log name"></TextInput>
          <TextInput
            style={styles.inputItem}
            label="Description"
            mode="outlined"
            placeholder="Enter description for log"></TextInput>
          <DropDownPicker
            textStyle={styles.typeDropdownText}
            placeholder="Select log type"
            style={[styles.inputItem, styles.typeDropdown]}
            open={typeOpen}
            value={typeValue}
            items={typeItems}
            setOpen={setTypeOpen}
            setValue={setTypeValue}
            setItems={setTypeItems}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            color="#191e52"
            mode="contained"
            style={styles.button}
            onPress={() => {}}>
            Create
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateLog;
