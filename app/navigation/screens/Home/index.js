import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FAB, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {capitalizeFirstLetter} from '../../../utils/common';
import {useSelector, useDispatch} from 'react-redux';
import {getLogs, deleteLog} from 'mylogs/app/redux/actions/logsActions';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/core';

const screenwidth = Dimensions.get('window').width;

const LeftSwipe = ({item, closeRow}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        closeRow();
        navigation.navigate('EditLog', {item: item});
      }}>
      <View
        style={{
          backgroundColor: '#0c8ab9',
          height: '77%',
          width: screenwidth / 2,
          borderRadius: 10,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginVertical: 19,
          marginHorizontal: 20,
        }}>
        <Icon name="edit" style={styles.icon} />
        <Text
          style={{
            color: '#ffffff',
            fontFamily: 'Ubuntu-Medium',
            top: 4,
          }}>
          Edit
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const RightSwipe = ({item}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(deleteLog(item));
      }}>
      <View
        style={{
          backgroundColor: '#e20036',
          height: '77%',
          width: screenwidth / 2,
          borderRadius: 10,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          marginVertical: 19,
          marginRight: 20,
        }}>
        <Icon name="check" style={styles.icon} />
        <Text
          style={{
            color: '#ffffff',
            fontFamily: 'Ubuntu-Medium',
            top: 4,
          }}>
          Delete
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}) => {
  const logs = useSelector(state => state.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  const renderLogCard = ({item, index}) => {
    let row = [];

    const closeRow = index => {
      row[index].close()
    };

    return (
      <Swipeable
        ref={ref => (row[index] = ref)}
        overshootFriction={8}
        renderLeftActions={() => (
          <LeftSwipe item={item} closeRow={()=>{closeRow(index)}} />
        )}
        rightThreshold={10}
        renderRightActions={() => (
          <RightSwipe item={item} />
        )}
        friction={1}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogDetails', {item: item});
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
              <Text style={styles.logCardType}>
                {capitalizeFirstLetter(item.type)}
              </Text>
              <Icon name="bell" style={styles.icon} />
              <Text style={styles.logCardReminder}>
                {capitalizeFirstLetter(item.reminder)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
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
