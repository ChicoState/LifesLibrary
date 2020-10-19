import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import AddBook from './addbook';
const numColumns = 3;
const data = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
    { key: 'K' }, { key: 'L' }, { key: 'M' }, { key: 'N' }, { key: 'O' }, { key: 'P' }, { key: 'Q' }, { key: 'R' }, { key: 'S' }, { key: 'T' },
    { key: 'U' }, { key: 'V' }, { key: 'W' }, { key: 'X' }, { key: 'Y' }, { key: 'Z' },

];

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                style={styles.container}
                numColumns={numColumns}
                renderItem = {({ item, index }) => {
                    if (item.empty === true) {
                    return <View style={[styles.item, styles.itemInvisible]} />;
                    }
                    return (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Book {item.key}</Text>
                    </View>
                    )}}
            />
            <View style={{ position:'absolute', bottom: 5, right: 5}}>
                <AddBook/>
            </View>
            
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
        width: Dimensions.get('window').width / 3 - (1.5 * (numColumns - 1)),
        height: Dimensions.get('window').width / 3 * 1.5,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#fff',
    },
  });