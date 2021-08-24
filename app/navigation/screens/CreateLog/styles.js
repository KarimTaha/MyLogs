import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#fafbfc',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  container: {
    height: '100%'
  },
  inputItem: {
    marginBottom: 20,
    backgroundColor: '#fafbfc',
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 20,
  },
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
    fontWeight: 'normal'
  }, 
  paletteLabel: {
    fontSize: 16,
    marginVertical: 10,
  },
  scrollViewContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  typeDropdown: {
    borderRadius: 5,
    height: 60,
    paddingLeft: 13,
    backgroundColor: '#fafbfc',
    borderColor: '#808080',
    // marginBottom: 110,
  },
  typeDropdownText: {
    color: 'grey',
    fontSize: 15,
  },
});

export default styles;
