import React, { Component } from 'react';
import {
  Text, View, Image, TouchableOpacity, FlatList, Picker,
} from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';
import _ from 'lodash';
import outputs from '../Output.json';

import List from './components/List';
import Viewfinder from './components/Viewfinder';

import styles from './styles';
import flashIcon from './assets/flash.png';
import successIcon from './assets/success.png';
import failIcon from './assets/fail.png';
import triangleIcon from './assets/triangle.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: '',
      output: [{ title: ' ', opacity: 0 }],
      flash: false,
      select: 509,
      success: false,
    };
  }

  processOutput({ data }) {
    const { select, output } = this.state;
    let numbers = '';
    let success = false;

    const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc')
      .map(item => [_.round(item[0] / 255.0, 2), item[1]])
      .value();

    orderedData.slice(0, 6).forEach((item, index) => {
      numbers += `${item[0]}${index === 2 ? '\n' : ' '}`;
      if (item[1] === outputs[select]) success = true;
    });

    if (
      !output.filter(({ title }) => title === orderedData[0][1]).length && orderedData[0][0] > 0.2
    ) {
      output.unshift({
        title: orderedData[0][1],
        opacity: orderedData[0][0] * 4,
      });
    }

    this.setState(() => ({
      output: output.slice(0, 5),
      numbers,
      success,
    }));
  }

  render() {
    const {
      numbers,
      output,
      flash,
      success,
      select,
    } = this.state;

    const modelParams = {
      file: 'mobilenet_v1_1.0_224_quant.tflite',
      inputDimX: 224,
      inputDimY: 224,
      outputDim: 1001,
      freqms: 200 * (success ? 10 : 1),
    };

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
          onModelProcessed={data => this.processOutput(data)}
          modelParams={modelParams}
        >
          <Text style={styles.cameraNumbers}>{numbers}</Text>
          <View
            style={[
              styles.select,
              success ? styles.selectSuccess : {},
            ]}
          >
            <Picker
              selectedValue={select}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => this.setState({ select: itemIndex })}
            >
              {outputs.map((item, index) => <Picker.Item label={item} value={index} key={item} />)}
            </Picker>

            {success ? (
              <Image
                style={{ width: 40, height: 40, marginRight: 20 }}
                source={successIcon}
              />
            ) : (
              <Image
                style={{ width: 40, height: 40, marginRight: 20 }}
                source={failIcon}
              />
            )}

            <Text style={[
              styles.selectText,
              success ? styles.selectSuccessText : {},
            ]}
            >
              {outputs[select]}
            </Text>

            <Image
              style={{
                width: 15,
                height: 10,
                margin: 7,
                marginTop: 10,
                transform: [{ rotate: '180deg' }],
                opacity: +!success,
              }}
              source={triangleIcon}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.setState({ flash: !flash })}
            style={styles.flash}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={flashIcon}
            />
          </TouchableOpacity>

          <Viewfinder success={success} />

          <FlatList
            style={styles.lists}
            data={output}
            renderItem={({ item }) => <List title={item.title} opacity={item.opacity} />}
            keyExtractor={item => `${item.title}-${item.opacity}`}
          />

        </RNCamera>
      </View>
    );
  }
}
