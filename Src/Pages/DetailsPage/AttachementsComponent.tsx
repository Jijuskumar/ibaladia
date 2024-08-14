import React, {FC} from 'react';
import {Image, Text, View} from 'react-native';
import {style} from './ListPageStyle';
import {getHeight, getWidth} from '../../Helper/DimensionsHelper';
import {DocumentBO} from '../../BOs/DocumentBO';
import {LocalImages} from '../../Assets/Images/Images';
import AttachmentListComponent from '../../Components/AttachmentListComponent';

interface AttachementsComponentProps {
  attachments: DocumentBO[];
  onPressView: (doc: DocumentBO) => void;
}

const AttachementsComponent: FC<AttachementsComponentProps> = ({
  attachments,
  onPressView,
}) => {
  return (
    <View style={[style.content, {marginBottom: 120}]}>
      <View style={style.contentHeader}>
        <Text
          style={[
            style.text,
            {
              marginRight: getWidth(10),
              fontSize: 20,
              fontWeight: '600',
            },
          ]}>
          المرفقات
        </Text>
      </View>
      {attachments.length === 0 ? (
        <View
          style={{
            height: getHeight(200),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              style.text,
              {fontSize: 24, fontWeight: '600', marginBottom: 10},
            ]}>
            لا توجد مرفقات
          </Text>
          <Image
            source={LocalImages.attachment}
            style={{width: getWidth(40), height: getHeight(60)}}
          />
        </View>
      ) : (
        <>
          {attachments.map((doc: DocumentBO, index: number) => {
            return (
              <AttachmentListComponent
                doc={doc}
                index={index}
                isLast={index === attachments.length - 1}
                onPressView={onPressView}
                key={doc.id}
              />
            );
          })}
        </>
      )}
    </View>
  );
};

export default AttachementsComponent;
