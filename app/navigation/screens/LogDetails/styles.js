import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#fafbfc',
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 30,
    marginTop: 25,
  },
  container: {
    height: '100%',
  },
  entryItemRow: {
    flexDirection: 'row',
    padding: 5,
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  labelValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  labelValueText: {
    fontSize: 16,
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 20,
  },
  tabButtonsContainer: {
    alignContent: 'center',
    alignItems: 'center',
    height: 47,
    justifyContent: 'center',
    textAlign: 'center'
  },
  tabContainer: {
    padding: 20,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
