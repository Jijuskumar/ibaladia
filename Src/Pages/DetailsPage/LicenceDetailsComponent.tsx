import React, {FC} from 'react';
import {Text, View} from 'react-native';
import InfoDividerComponent from '../../Components/InfoDividerComponent';
import {style} from './ListPageStyle';
import {getWidth} from '../../Helper/DimensionsHelper';
import {DetailsBO} from '../../BOs/DetailsBO';

interface LicenceDetailsComponentProps {
  licenceDetails: DetailsBO;
}

const LicenceDetailsComponent: FC<LicenceDetailsComponentProps> = ({
  licenceDetails,
}) => {
  return (
    <View style={style.content}>
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
          وصف الإعلان
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <InfoDividerComponent
          primaryText={`اسم نوع الترخيص :${licenceDetails.license_type_name}`}
          secondaryText={`سم نوع الإعلان :${licenceDetails.adv_material_type_name}`}
        />
        <InfoDividerComponent
          secondaryText={`موقع الإعلان :${licenceDetails.adv_location}`}
          primaryText={`عرض :${licenceDetails.width.toFixed()}`}
        />
        <InfoDividerComponent
          primaryText={`طول :${licenceDetails.adv_length.toFixed()}`}
          secondaryText={`هل يوجد شعار :${
            licenceDetails.is_logo_there ? 'Yes' : 'No'
          }`}
        />
      </View>
    </View>
  );
};

export default LicenceDetailsComponent;
