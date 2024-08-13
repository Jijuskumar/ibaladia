import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface InfoDividerComponentProps {
  primaryText?: string;
  secondaryText?: string;
}

const InfoDividerComponent: FC<InfoDividerComponentProps> = ({
  primaryText,
  secondaryText,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      {primaryText && (
        <View style={{flex: 1, marginLeft: 5}}>
          <Text style={style.text}>{primaryText}</Text>
        </View>
      )}
      {secondaryText && (
        <View style={{flex: 1, marginLeft: 5}}>
          <Text style={style.text}>{secondaryText}</Text>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#000',
    textAlign: 'right',
    fontSize: 12,
  },
});

export default InfoDividerComponent;
