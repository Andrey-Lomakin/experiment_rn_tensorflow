import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lists: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    color: 'white',
    fontSize: 18,
  },
  cameraNumbers: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 19,
    fontWeight: '400',
  },
  flash: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
    padding: 20,
  },
  select: {
    position: 'absolute',
    top: 80,
    left: 0,
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  selectText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    borderBottomColor: 'rgba(200,200,200, 0.4)',
    borderBottomWidth: 1,
  },

  selectSuccess: {
    backgroundColor: '#FFFFFF',
  },
  selectSuccessText: {
    color: '#003B00',
    borderBottomWidth: 0,
  },

  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    minWidth: 250,
  },
});
