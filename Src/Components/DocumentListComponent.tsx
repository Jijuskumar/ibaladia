import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getHeight, getWidth} from '../Helper/DimensionsHelper';
import {DocumentBO} from '../BOs/DocumentBO';
import {LocalImages} from '../Assets/Images/Images';

interface DocumentListComponentProps {
  doc: DocumentBO;
  index: number;
  onPressView: (doc: DocumentBO) => void;
  onPreddDelete: (doc: DocumentBO) => void;
}

const DocumentListComponent: FC<DocumentListComponentProps> = ({
  doc,
  index,
  onPreddDelete,
  onPressView,
}) => {
  return (
    <View style={style.documentList} key={doc.id}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={[style.listColumn, {flex: 2.5}]}>
          <Text style={style.text}>اسم الملف : {doc.object_name ?? '-'}</Text>
        </View>
        <View style={style.listColumn}>
          <Text style={style.text}>نوع الملف: {doc.document_type ?? '-'}</Text>
        </View>
        <View style={[style.listColumn, {flex: 1.25}]}>
          <Text style={style.text}>ملف #: {index + 1}</Text>
        </View>
        <View
          style={[
            style.listColumn,
            {flex: 1.5, flexWrap: 'wrap', alignItems: 'center'},
          ]}>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => onPressView(doc)}>
            <Image
              style={{
                height: getHeight(20),
                width: getWidth(30),
                marginRight: getWidth(5),
              }}
              source={LocalImages.view}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => onPreddDelete(doc)}>
            <Image
              style={{
                height: getHeight(20),
                width: getWidth(20),
              }}
              source={LocalImages.delete}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 16,
  },
  uploadWrapper: {
    marginHorizontal: getWidth(10),
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    paddingBottom: getHeight(5),
  },
  documentsContainer: {
    marginHorizontal: getWidth(8),
    backgroundColor: '#fff',
  },
  documentList: {
    width: '100%',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  listColumn: {
    flex: 2,
    alignItems: 'flex-end',
    height: '100%',
    marginRight: 5,
  },
});

export default DocumentListComponent;
