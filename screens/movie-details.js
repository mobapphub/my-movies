/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import Config from '../config'
import { MainHeader } from '../components/main-header'

export class MovieDetails extends Component {
    static navigationOptions = {
        title: 'Movie Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            title: MovieDetails.navigationOptions.title,
            poster_path: '',
            overview: '',
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
                    title: responseJson.title,
                    poster_path: responseJson.poster_path,
                    overview: responseJson.overview,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <MainHeader 
                        title={this.state.title}
                        navigation={this.props.navigation}
                    />
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ScrollView>
                <MainHeader
                    title='Movie'
                    navigation={this.props.navigation}
                />
                <Text style={styles.titleText}>{this.state.title}</Text>
                <Divider style={{ backgroundColor: '#000' }} />
                <Image 
                    source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.poster_path }}
                    style={{ width: 500, height: 500 }}
                />
                <Text style={styles.bodyText}>{this.state.overview}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: '#000',
        fontSize: 26,
        textAlign: 'center',
        padding: 10
    },
    bodyText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        paddingTop: 30, 
        paddingBottom: 30, 
    }
});
