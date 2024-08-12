import React from 'react';
import {View, Text} from 'react-native';

const TaskPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{color: '#000', fontSize: 24}}>TaskPage Page</Text>
    </View>
  );
};

export default TaskPage;
