import React from 'react';
import styles from './styles';
import {Text, View, FlatList, Pressable} from 'react-native';
import {Divider} from 'react-native-paper';

const RoundedTabs = ({data, selected = 0, onChangeTab, styleProp, color}) => {
  return (
    <View style={[styleProp, styles.root]}>
      <FlatList
        contentContainerStyle={styles.rootContentContainer}
        style={styles.root}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) =>
          renderButton(item, selected, onChangeTab, color)
        }
      />
      <Divider />
    </View>
  );
};

const renderButton = (item, selected, onChangeTab, color) => {
  const isSelected = selected != null && selected == item.id;

  return (
    <View
      style={[
        styles.roundedButton,
        isSelected ? {backgroundColor: `#${color}`} : null,
      ]}>
      <Pressable
        onPress={() => onChangeTab(item.id)}
        android_ripple={{
          color: 'grey',
          borderless: false,
        }}>
        <Text
          style={[
            styles.buttonText,
            {
              color: isSelected ? '#ffff' : '#000000',
            },
          ]}>
          {`${item.name}`}
        </Text>
      </Pressable>
    </View>
  );
};

export default RoundedTabs;
