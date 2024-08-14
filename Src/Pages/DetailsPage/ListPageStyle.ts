import {StyleSheet} from 'react-native';
import {
  getHeight,
  getWidth,
  height,
  width,
} from '../../Helper/DimensionsHelper';

export const style = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 15,
  },
  headingText: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
    marginTop: 20,
  },
  input: {
    height: getHeight(40),
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#000',
    textAlign: 'right',
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
  submitButton: {
    height: 50,
    backgroundColor: '#BF9C38',
    marginHorizontal: getWidth(10),
    marginTop: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width - getWidth(40),
    borderRadius: 8,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginTop: 25,
    paddingBottom: 8,
    marginBottom: 5,
  },
  contentHeader: {
    height: 45,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
