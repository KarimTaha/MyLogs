import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Touchable, TouchableOpacity} from 'react-native';
import {FAB, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {getLogs} from 'mylogs/app/redux/actions/logsActions';

const HomeScreen = ({navigation}) => {
  
  const logs = useSelector(state => state.logs)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const renderLogCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LogDetails', {item: item});
        }}
        onLongPress={() => {
          console.log(`${item.name} long pressed`);
        }}
        activeOpacity={0.95}
        style={styles.logCardContainer}>
        <View
          style={[
            styles.logCardBorderTop,
            {backgroundColor: '#' + item.color},
          ]}></View>
        <View style={styles.logCardTextContainer}>
          <Text style={styles.logCardName}>{item.name}</Text>
          <Text style={styles.logCardDesc}>{item.description}</Text>
          <Divider style={styles.divider} />
          <View style={styles.logCardTextBottom}>
            <Icon name="sliders" style={styles.icon} />
            <Text style={styles.logCardType}>{item.type}</Text>
            <Icon name="bell" style={styles.icon} />
            <Text style={styles.logCardReminder}>{item.reminder}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Logs</Text>
      <FlatList
        data={logs.items}
        renderItem={renderLogCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}></FlatList>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('CreateLog');
        }}
      />
    </View>
  );
};

export default HomeScreen;
