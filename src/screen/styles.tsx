import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  listContent: {
    margin: 5,
  },
  item: {
    flex: 1,
    marginBottom: 25,
  },
  itemImage: {
    height: 200,
  },
  itemInfo: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemInfoTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemInfoHeader: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleFilter: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sol: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  titleSol: {
    fontWeight: 'bold',
  },
});
