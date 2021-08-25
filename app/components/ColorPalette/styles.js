import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  paletteColor: {
    width: 60,
    height: 60,
    borderRadius: 60,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paletteContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  paletteIcon: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'normal',
  },
  paletteLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default styles;
