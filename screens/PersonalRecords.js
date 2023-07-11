import { View, Text, StyleSheet, Pressable, FlatList} from 'react-native';

const DUMMY_RECORDS = [
  {
    id: 'r1',
    exercise: 'Bench Press',
    record: '125 lbs',
    date: new Date('2021-12-19'),
  },
  {
    id: 'r2',
    exercise: 'Leg Press',
    record: '120 lbs',
    date: new Date('2021-12-19'),
  },
];

function RecordItem({ exercise, record, date }) {
  function recordPressHandler(){}
  
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
          <Text style={styles.textBase}>{fixDate(date)}</Text> 
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
  return (
    <View style={styles.container}>
        <FlatList
          data={DUMMY_RECORDS}
          renderItem={renderRecordItem}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}
function fixDate(date) {
  return(date.getFullYear()+ "-" + (date.getMonth()+1) + "-" + (date.getDate()+1));
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
  }
});