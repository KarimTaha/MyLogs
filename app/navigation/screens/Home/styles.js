import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    height: '100%',
  },
  divider: {
    marginVertical: 10,
  },
  icon: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  pageTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    margin: 20,
  },
  logCardBorderTop: {
    position: 'absolute',
    height: 10,
    width: '100%',
    top: 7,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.8,
    zIndex: 0,
  },
  logCardContainer: {
    paddingVertical: 10,
    marginVertical: 7,
    marginHorizontal: 20,
  },
  logCardName: {
    fontSize: 16,
  },
  logCardDesc: {
    color: '#808080',
  },
  logCardTextContainer: {
    backgroundColor: 'red',
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  logCardTextLeft: {},
  logCardTextBottom: {
    flexDirection: 'row',
  },
  logCardType: {
    flex: 1,
  },
  logCardReminder: {
    flex: 1,
  },
});

export default styles;
