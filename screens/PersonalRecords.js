import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RecordsContext } from '../RecordsContext';

/*function fixDate(date) {
  return(date.getFullYear()+ "-" + (date.getMonth()+1) + "-" + (date.getDate()+1));
}*/

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

function RecordItem({ id, exercise, record, date }) {
  const navigation = useNavigation();
  
  function recordPressHandler() {
    navigation.navigate('ManageRecord', {
      recordId: id
    });
  }
  
  return (
    <Pressable 
      onPress={recordPressHandler} 
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.recordItem}>
        <View>
          <Text style={[styles.textBase, styles.exercise]}>
            {exercise}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text> 
        </View>
        <View style={styles.recordContainer}>
          <Text style={styles.record}>{record}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function renderRecordItem(itemData) {
  return (
    <RecordItem {...itemData.item} />);  
}

function PersonalRecords() {
  const navigation = useNavigation();

  const recordsCtx = useContext(RecordsContext);

  const handleAddRecord = () => {
    navigation.navigate('ManageRecord');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Personal Records',
      headerRight: () => (
        <TouchableOpacity 
          onPress={handleAddRecord} 
          style={({pressed}) => pressed && styles.pressed}
        >
          <Ionicons name="add" size={24} color="black" style={styles.addButton} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  let content = <Text style={styles.infoText}>No Records Added!</Text>;

  if (recordsCtx.records.length > 0) {
    content = 
    <FlatList
      data={recordsCtx.records}
      renderItem={renderRecordItem}
      keyExtractor={(item) => item.id}
    />;
  }

  return (
    <View style={styles.container}>
        {content}
    </View>
  );
}

export default PersonalRecords;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
  },

  recordItem: {
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
  },
  
  textBase: {
    color: 'white',
  },

  exercise: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  
  recordContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 20
  },

  record: {
    color: 'black',
    fontWeight: 'bold'
  },
  addButton: {
    marginRight: 20,
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});