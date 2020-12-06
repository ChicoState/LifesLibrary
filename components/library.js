import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button } from 'react-native';
import UL from "./db";

const numColumns = 3;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
            <FlatList
                data={{}}
                style={styles.container}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem = {({ item, index }) => {
                    if (item.empty === true) {
                    return <View style={[styles.item, styles.itemInvisible]} />;
                    }
                    return (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                    )}}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
    },
    item: {
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        margin: 1.5,
        width: Dimensions.get('window').width / numColumns - (3),
        height: Dimensions.get('window').width / numColumns * 1.5,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
  });
