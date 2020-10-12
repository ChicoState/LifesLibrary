import React, {useState} from 'react';
import { Button, Text, View, StyleSheet, FlatList, StatusBar, SafeAreaView, Dimensions, TextInput, Modal } from 'react-native';
import Swiper from 'react-native-swiper/src';
import Scanner from '../components/scanner';
import Library from '../components/library';
import { Component } from 'react';

export default class App extends React.Component 
{
    render()
    {
        return(
    
            <Swiper loop={false} showsPagination={false} index={1}>
                <View style={styles.search}>
                    <Text>Search</Text>
                    <TextInput placeholder="Search Book Titles" 
                    style={{backgroundColor: '#eee', width: Dimensions.get('window').width, textAlign: "center", fontSize: 30,}}/>
                </View >
                <Library/>             
                <Scanner/>
            </Swiper>
              
        );
    }

}

const styles = StyleSheet.create({
    search: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slidestyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd'
    },
});