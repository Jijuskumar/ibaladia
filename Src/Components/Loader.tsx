import React, {FC} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {getWidth, height, width} from '../Helper/DimensionsHelper';

interface LoaderProps {
  title: string;
  visible: boolean;
}

const Loader: FC<LoaderProps> = props => {
  return (
    <Modal statusBarTranslucent transparent visible={props.visible}>
      <View style={style.container}>
        <View style={style.loaderWrapper}>
          <ActivityIndicator
            color={'#000'}
            size={30}
            style={{marginRight: 20}}
          />
          <Text style={style.textbold}>تحميل...</Text>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000001a',
  },
  loaderWrapper: {
    width: width - getWidth(100),
    backgroundColor: '#fff',
    height: 100,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbold: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Loader;
