import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ListPage from '../Pages/ListPage';
import TaskPage from '../Pages/TaskPage';

const TaskStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TaskList" component={TaskPage} />
      <Stack.Screen name="TaskDetails" component={ListPage} />
    </Stack.Navigator>
  );
};

export default TaskStack;
