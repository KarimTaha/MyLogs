import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import styles from './styles';
import {Appbar, Button, Divider, TextInput} from 'react-native-paper';
import RoundedTabs from 'mylogs/app/components/RoundedTabs';
import {useSelector, useDispatch} from 'react-redux';
import {
  getLogEntries,
  createLogEntry,
  deleteLogEntry,
  editLogEntry,
} from 'mylogs/app/redux/actions/logEntriesActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {capitalizeFirstLetter, splitPascalCase} from 'mylogs/app/utils/common';
import {LOG_DETAILS_TABS} from 'mylogs/app/constants';

const LogDetails = ({navigation, route}) => {
  const log = route.params.item;
  const logEntries = useSelector(state => state.logEntries);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const [entryModalVisible, setEntryModalVisible] = useState(false);

  const handleTabChange = newValue => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    dispatch(getLogEntries(log.id));
    console.log('---------------------------logEntries', logEntries);
  }, []);

  const showEntryModal = () => setEntryModalVisible(true);
  const hideEntryModal = () => setEntryModalVisible(false);

  const renderLogEntryItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Hiiii');
        }}
        onLongPress={() => {
          dispatch(deleteLogEntry(item));
        }}>
        <View>
          <View style={styles.entryItemRow}>
            <Icon name="calendar-times-o" style={styles.icon} />
            <Text>
              {moment(Number.parseInt(item.creation_date)).format(
                'DD-MM-YYYY hh:mm a',
              )}
            </Text>
          </View>
          <View style={styles.entryItemRow}>
            <Icon name="chevron-right" style={styles.icon} />
            <Text>{item.value}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const DetailsTab = ({log}) => {
    return (
      <View style={styles.tabContainer}>
        <LabelValueItem label="Name" value={log.name} />
        <LabelValueItem label="Description" value={log.description} />
        <LabelValueItem label="Type" value={splitPascalCase(capitalizeFirstLetter(log.type))} />
        <LabelValueItem label="Creation Date" value={log.creation_date} />
        <LabelValueItem label="Reminder" value={log.reminder} />
      </View>
    );
  };
  const EntriesTab = () => {
    const [newEntryValue, setNewEntryValue] = useState(0);
    return (
      <View style={styles.tabContainer}>
        <Modal
          transparent={true}
          visible={entryModalVisible}
          onRequestClose={() => {
            setEntryModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Add Entry</Text>
              <View style={styles.modalValueRow}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.modalInputValue}
                  label="Value"
                  mode="contained"
                  placeholder="Enter value"
                  value={newEntryValue}
                  onChangeText={value => setNewEntryValue(value)}
                />
              </View>
              <View style={styles.modalButtonsRow}>
                <Button
                  color="#000000"
                  mode="text"
                  onPress={() => {
                    hideEntryModal();
                  }}>
                  Cancel
                </Button>
                <Button
                  color="#000000"
                  style={styles.addEntryBtn}
                  mode="contained"
                  onPress={() => {
                    dispatch(
                      createLogEntry({
                        log_id: log.id,
                        value: newEntryValue,
                        creation_date: moment.now(),
                      }),
                    );
                    hideEntryModal();
                  }}>
                  Add
                </Button>
              </View>
            </View>
          </View>
        </Modal>

        <Button
          color="#000000"
          style={styles.addEntryBtn}
          mode="text"
          onPress={() => {
            showEntryModal();
          }}>
          Add
        </Button>
        <FlatList
          style={styles.entriesList}
          data={logEntries.items}
          renderItem={renderLogEntryItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <Divider />;
          }}
        />
      </View>
    );
  };
  const GraphTab = () => {
    return (
      <View style={styles.tabContainer}>
        <Text>Graph Tab</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Log Details</Text>
        <View
          style={[styles.colorCircle, {backgroundColor: `#${log.color}`}]}
        />
      </View>
      <View style={styles.tabButtonsContainer}>
        <RoundedTabs
          data={LOG_DETAILS_TABS}
          selected={selectedTab}
          onChangeTab={handleTabChange}
          color={log.color}
        />
      </View>
      {selectedTab == 1 ? (
        <DetailsTab log={log} />
      ) : selectedTab == 2 ? (
        <EntriesTab />
      ) : (
        <GraphTab />
      )}
    </View>
  );
};

const LabelValueItem = ({label, value}) => {
  return (
    <View style={styles.labelValueRow}>
      <Text style={styles.labelValueText}>{label}</Text>
      <Text style={styles.labelValueText}>{value}</Text>
    </View>
  );
};

export default LogDetails;
