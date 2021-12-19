import React, {useEffect, useState} from 'react';
import {FlatList, Image, ListRenderItem, Text, View} from 'react-native';
import {Photo, Response} from '../interfaces/appInterfaces';
import {formatUTC} from '../utils/date';
import {styles} from './styles';

const Principal = () => {
  const [dataSource, setDataSource] = useState<Photo[]>([]);
  const [offset, setOffset] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), []);

  const getData = () => {
    console.log('getData', offset);
    console.log('fecha', formatUTC(new Date(), 'YYYY-MM-DD'));
    //Service to get the data from the server to render
    fetch(
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=' +
        offset +
        '&api_key=RzIMtdldE1LmpM7hfyQcKCHVGU6221KXmyRgCnLq',
    )
      //Sending the currect offset with get request
      .then(response => response.json())
      .then((responseJson: Response) => {
        //Successful response from the API Call
        setOffset(offset + 1);
        //After the response increasing the offset for the next API call.
        setDataSource([...dataSource, ...responseJson.photos]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ListItem: ListRenderItem<Photo> = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemInfoHeader}>
          Camera: {item.camera.full_name}
        </Text>
        <Image style={styles.itemImage} source={{uri: item.img_src}} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemInfoTitle}>{item.earth_date}</Text>
          <Text style={styles.itemInfoTitle}>Sol: {item.sol}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.titleFilter}>Filtros de busqueda:</Text>
      </View>
      {dataSource.length ? (
        <FlatList
          style={styles.listContent}
          data={dataSource}
          renderItem={ListItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={getData}
        />
      ) : (
        <View style={styles.empty}>
          <Text>Not found results</Text>
        </View>
      )}
    </View>
  );
};

export default Principal;
