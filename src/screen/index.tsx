import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Photo, Response} from '../interfaces/appInterfaces';
import {formatUTC} from '../utils/date';
import {styles} from './styles';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';

const Principal = () => {
  const [dataSource, setDataSource] = useState<Photo[]>([]);
  const [offset, setOffset] = useState(1);
  const [sol, setSol] = useState('');
  const [date, setDate] = useState('2015-05-01');
  const [camera, setCamera] = useState('FHAZ');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(date, sol, camera, offset), []);

  const loadMore = () => {
    getData(date, sol, camera, offset);
  };

  const getData = (
    fecha: string,
    solValue: string,
    camara: string,
    page: number,
  ) => {
    let select = 'earth_date=' + formatUTC(new Date(fecha), 'YYYY-MM-DD');

    if (solValue !== '') {
      select = 'sol=' + solValue;
    }

    const url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?' +
      select +
      '&camera=' +
      camara +
      '&page=' +
      page +
      '&api_key=RzIMtdldE1LmpM7hfyQcKCHVGU6221KXmyRgCnLq';

    //Service to get the data from the server to render
    fetch(url)
      //Sending the currect offset with get request
      .then(response => response.json())
      .then((responseJson: Response) => {
        //Successful response from the API Call
        setOffset(page + 1);
        //After the response increasing the offset for the next API call.

        if (page === 1) {
          setDataSource(responseJson.photos);
        } else {
          setDataSource([...dataSource, ...responseJson.photos]);
        }
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
        <RNPickerSelect
          value={'FHAZ'}
          onValueChange={value => {
            setCamera(value);
            getData(date, sol, camera, 1);
          }}
          items={[
            {label: 'Front Hazard Avoidance Camera', value: 'FHAZ'},
            {label: 'Rear Hazard Avoidance Camera', value: 'RHAZ'},
            {label: 'Mast Camera', value: 'MAST'},
            {label: 'Chemistry and Camera Complex', value: 'CHEMCAM'},
            {label: 'Mars Hand Lens Imager', value: 'MAHLI'},
            {label: 'Mars Descent Imager', value: 'MARDI'},
            {label: 'Navigation Camera', value: 'NAVCAM'},
            {label: 'Panoramic Camera', value: 'PANCAM'},
            {
              label: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
              value: 'MINITES',
            },
          ]}
        />
        <View style={styles.options}>
          <DatePicker
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2015-01-01"
            maxDate="2021-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={value => {
              setDate(value);
              getData(value, sol, camera, 1);
            }}
          />
          <View style={styles.sol}>
            <Text style={styles.titleSol}>Sol:</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => {
                setSol(text);
                getData(date, text, camera, 1);
              }}
            />
          </View>
        </View>
      </View>
      {dataSource.length ? (
        <FlatList
          style={styles.listContent}
          data={dataSource}
          renderItem={ListItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMore}
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
