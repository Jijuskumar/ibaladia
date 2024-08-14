import React, {FC} from 'react';
import {Text, View} from 'react-native';
import InfoDividerComponent from '../../Components/InfoDividerComponent';
import {getHeight, getWidth} from '../../Helper/DimensionsHelper';
import {style} from './ListPageStyle';
import {RequestDetailsBO} from '../../BOs/RequestDetailsBO';

interface RequestInfoComponentProps {
  request?: RequestDetailsBO;
}

const RequestInfoComponent: FC<RequestInfoComponentProps> = ({request}) => {
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
          طلب تفاصيل
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <InfoDividerComponent
          primaryText={`حالة الطلب : ${request?.request_number ?? '-'}`}
          secondaryText={`رقم الطلب : ${request?.request_status ?? '-'}`}
        />
        <InfoDividerComponent
          secondaryText={`تاريخ الطلب : ${
            request?.license_date
              ?.split('T')[0]
              .split('-')
              .reverse()
              .join('-') ?? '-'
          }`}
          primaryText={`رقم الرخصة : ${request?.license_number ?? '-'}`}
        />
        <InfoDividerComponent
          primaryText={`تاريخ إصدار الترخيص : ${
            request?.issue_date?.split('T')[0].split('-').reverse().join('-') ??
            '-'
          }`}
          secondaryText={`تاريخ انتهاء الترخيص : ${
            request?.expiry_date
              ?.split('T')[0]
              .split('-')
              .reverse()
              .join('-') ?? '-'
          }`}
        />
        <InfoDividerComponent
          secondaryText={`إجمالي الرسوم : ${request?.total_fees ?? '-'}`}
        />
      </View>
      <View
        style={[
          style.uploadWrapper,
          {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#d3d3d3',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: getHeight(50),
            backgroundColor: '#d3d3d3',
          }}>
          <Text style={{fontSize: 20, color: '#000', marginRight: 10}}>
            بيانات التجارة
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <InfoDividerComponent
            primaryText={`الرقم المدني للشركة : ${
              request?.shop_civil_id ?? '-'
            }`}
            secondaryText={`رقم الترخيص التجاري: ${
              request?.moci_license_numer ?? '-'
            }`}
          />
          <InfoDividerComponent
            primaryText={`اسم المحل' :${request?.shop_name ?? '-'}`}
            secondaryText={`اسم نوع النشاط' :${request?.activity_type_name}?? '-'}`}
          />
          <InfoDividerComponent
            primaryText={`تاريخ الإصدار : ${
              request?.issue_date
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-') ?? '-'
            }`}
            secondaryText={`تاريخ الانتهاء : ${
              request?.expiry_date
                .split('T')[0]
                .split('-')
                .reverse()
                .join('-') ?? '-'
            }`}
          />
          <InfoDividerComponent
            secondaryText={`رقم الوحدة : ${request?.paci_number ?? '-'}`}
          />
        </View>
      </View>
      <View
        style={[
          style.uploadWrapper,
          {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            marginTop: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: getHeight(50),
            backgroundColor: '#d3d3d3',
          }}>
          <Text style={{fontSize: 20, color: '#000', marginRight: 10}}>
            عنوان البلدية
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <InfoDividerComponent
            primaryText={`محافظة : ${request?.governorate ?? '-'}`}
            secondaryText={`قطعة : ${request?.block ?? '-'}`}
          />
          <InfoDividerComponent
            primaryText={'منطقة :'}
            secondaryText={`قسيمة : ${request?.parcel ?? '-'}`}
          />
          <InfoDividerComponent
            primaryText={`رقم القسيمة : ${request?.parcel_number ?? '-'}`}
            secondaryText={'نوع الاستعمال :'}
          />
          <InfoDividerComponent secondaryText={'الدور :'} />
          <InfoDividerComponent
            primaryText={'رقم الوحدة :'}
            secondaryText={`مالك المبنى :' ${request?.building_owner ?? ''}`}
          />
        </View>
      </View>
    </View>
  );
};

export default RequestInfoComponent;
