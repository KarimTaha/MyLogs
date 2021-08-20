import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const CreateLog = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Create Log</Text>
    </View>
  );
};

export default CreateLog;
