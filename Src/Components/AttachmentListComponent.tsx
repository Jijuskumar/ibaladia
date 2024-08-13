import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DocumentBO} from '../BOs/DocumentBO';
import {LocalImages} from '../Assets/Images/Images';
import {getHeight, getWidth} from '../Helper/DimensionsHelper';

interface AttachmentListComponentProps {
  doc: DocumentBO;
  index: number;
  isLast: boolean;
  onPressView: (doc: DocumentBO) => void;
}

const AttachmentListComponent: FC<AttachmentListComponentProps> = ({
  doc,
  index,
  isLast,
  onPressView,
}) => {
  return (
    <View
      key={doc.id + index}
      style={{
        marginTop: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: isLast ? 0 : 1,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => onPressView(doc)}
        style={{
          width: 90,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Image
          source={LocalImages.view}
          style={{
            width: getWidth(30),
            height: getHeight(25),
            marginLeft: 10,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={[style.text]}>ملف #: {index + 1}</Text>
        <Text style={[style.text]}>نوع الملف : {doc.document_type ?? '-'}</Text>
        <Text style={[style.text]}>الترخيص :{doc.object_name ?? '-'}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
  },
});

export default AttachmentListComponent;
