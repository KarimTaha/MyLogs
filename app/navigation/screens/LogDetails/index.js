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
import DatePicker from 'react-native-date-picker';
import LogChart from 'mylogs/app/components/LogChart';

const LogDetails = ({navigation, route}) => {
  const log = route.params.item;
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = newValue => {
    setSelectedTab(newValue);
  };

  const DetailsTab = ({log}) => {
    const LabelValueItem = ({label, value}) => {
      return (
        <View style={styles.labelValueRow}>
          <Text style={styles.labelValueText}>{label}</Text>
          <Text style={styles.labelValueText}>{value}</Text>
        </View>
      );
    };
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.detailsName}>{log.name}</Text>
        {log.description.length > 0 ? (
          <Text style={styles.detailsDescription}>{log.description}</Text>
        ) : null}
        <View style={styles.detailsRow}>
          <Icon name="sliders" style={styles.icon} />
          <Text>{splitPascalCase(capitalizeFirstLetter(log.type))}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Icon name="calendar" style={styles.icon} />
          <Text>
            {moment(Number.parseInt(log.creation_date)).format(
              'DD-MM-YYYY hh:mm a',
            )}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <Icon name="bell" style={styles.icon} />
          <Text>{log.reminder}</Text>
        </View>
      </View>
    );
  };

  const EntriesTab = () => {
    const logEntries = useSelector(state => state.logEntries);
    const [addEntryModalVisible, setAddEntryModalVisible] = useState(false);
    const [editEntryModalVisible, setEditEntryModalVisible] = useState(false);
    const [editEntryItem, setEditEntryItem] = useState({});

    useEffect(() => {
      dispatch(getLogEntries(log.id));
    }, []);

    const showAddEntryModal = () => setAddEntryModalVisible(true);
    const hideAddEntryModal = () => setAddEntryModalVisible(false);

    const showEditEntryModal = () => setEditEntryModalVisible(true);
    const hideEditEntryModal = () => setEditEntryModalVisible(false);

    const renderLogEntryItem = ({item, index}) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setEditEntryItem(item);
            showEditEntryModal();
          }}
          onLongPress={() => {
            dispatch(deleteLogEntry(item));
          }}>
          <View>
            <View style={styles.entryItemRow}>
              <Icon name="calendar-times-o" style={styles.icon} />
              <Text>
                {moment(Number.parseInt(item.value_date)).format(
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

    const AddEntryModal = () => {
      const [newEntryValue, setNewEntryValue] = useState('');
      const [newEntryDate, setNewEntryDate] = useState(new Date());
      const [newEntryValueValid, setNewEntryValueValid] = useState(true);

      return (
        <Modal
          transparent={true}
          visible={addEntryModalVisible}
          onRequestClose={() => {
            setAddEntryModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Add Entry</Text>
              <DatePicker date={newEntryDate} onDateChange={setNewEntryDate} />
              <View style={styles.modalValueRow}>
                <TextInput
                  error={!newEntryValueValid}
                  keyboardType="numeric"
                  style={styles.modalInputValue}
                  label="Value"
                  mode="contained"
                  placeholder="Enter value"
                  value={newEntryValue}
                  onChangeText={value => {
                    setNewEntryValueValid(value.length > 0);
                    setNewEntryValue(value);
                  }}
                />
              </View>
              <View style={styles.modalButtonsRow}>
                <Button
                  color="#000000"
                  mode="text"
                  onPress={() => {
                    hideAddEntryModal();
                  }}>
                  Cancel
                </Button>
                <Button
                  color="#000000"
                  style={styles.addEntryBtn}
                  mode="contained"
                  onPress={() => {
                    if (newEntryValue) {
                      dispatch(
                        createLogEntry({
                          log_id: log.id,
                          value: newEntryValue,
                          value_date: moment(newEntryDate).valueOf(),
                          creation_date: moment.now(),
                        }),
                      );
                      hideAddEntryModal();
                    } else setNewEntryValueValid(false);
                  }}>
                  Add
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    const EditEntryModal = () => {
      const [editedEntryItem, setEditedEntryItem] = useState(editEntryItem);
      const valueDate = new Date(
        moment(Number.parseInt(editedEntryItem.value_date)).toISOString(),
      );
      const [editedEntryDate, setEditedEntryDate] = useState(valueDate);
      const [editedEntryValueValid, setEditedEntryValueValid] = useState(true);

      return (
        <Modal
          transparent={true}
          visible={editEntryModalVisible}
          onRequestClose={() => {
            setEditEntryModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Edit Entry</Text>
              <DatePicker
                date={editedEntryDate}
                onDateChange={setEditedEntryDate}
              />
              <View style={styles.modalValueRow}>
                <TextInput
                  error={!editedEntryValueValid}
                  keyboardType="numeric"
                  style={styles.modalInputValue}
                  label="Value"
                  mode="contained"
                  placeholder="Enter value"
                  value={editedEntryItem.value + ''}
                  onChangeText={value => {
                    setEditedEntryValueValid(value.length > 0);
                    setEditedEntryItem({...editedEntryItem, value: value});
                  }}
                />
              </View>
              <View style={styles.modalButtonsRow}>
                <Button
                  color="#000000"
                  mode="text"
                  onPress={() => {
                    hideEditEntryModal();
                  }}>
                  Cancel
                </Button>
                <Button
                  color="#000000"
                  style={styles.addEntryBtn}
                  mode="contained"
                  onPress={() => {
                    if (editedEntryValueValid) {
                      dispatch(
                        editLogEntry({
                          ...editedEntryItem,
                          value_date: moment(editedEntryDate).valueOf(),
                        }),
                      );
                      hideEditEntryModal();
                    }
                  }}>
                  Save
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    return (
      <View style={styles.tabContainer}>
        <AddEntryModal />
        <EditEntryModal />
        <Button
          color="#000000"
          style={styles.addEntryBtn}
          mode="text"
          onPress={() => {
            showAddEntryModal();
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
        <LogChart log={log} />
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

export default LogDetails;
