import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {LOG_COLORS} from 'mylogs/app/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const ColorPalette = props => {
  return (
    <View>
      <Text style={styles.paletteLabel}>Color</Text>
      <View style={styles.paletteContainer}>
        {LOG_COLORS.map(color => (
          <TouchableOpacity
            key={color.value}
            style={[styles.paletteColor, {backgroundColor: '#' + color.value}]}
            onPress={() => {
              props.onColorPressed(color.value);
            }}
            disabled={props.selectedColor == color.value}>
            {props.selectedColor == color.value ? (
              <Icon name="check" style={styles.paletteIcon} />
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ColorPalette;
