/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { Text, Header } from 'react-native-elements';
import Config from '../config'

export class MovieDetails extends Component {
    static navigationOptions = {
        title: 'Movie Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId');

        return fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + Config.THEMOVIEDB_API_KEY)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId');

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Header
                        leftComponent={{ icon: 'menu', color: '#000' }}
                        centerComponent={{ text: MovieDetails.navigationOptions.title, style: { color: '#000' } }}
                        rightComponent={{ icon: 'home', color: '#000' }}
                        backgroundColor='#fff'
                    />
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#000' }}
                    centerComponent={{ text: MovieDetails.navigationOptions.title, style: { color: '#000' } }}
                    rightComponent={{ icon: 'home', color: '#000' }}
                    backgroundColor='#fff'
                />
                <Text style={styles.bodyText}>'https://api.themoviedb.org/3/movie/{movieId}?api_key=a4f9abbcf3d616a410e63049322658b9'</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bodyText: {}
});
