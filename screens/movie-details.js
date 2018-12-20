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
import { withNavigation } from 'react-navigation';
import Config from '../config';
import MainHeader from '../components/main-header';

class MovieDetails extends Component {
    static navigationOptions = {
        title: 'Movie Details',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    updateDetailsFromAPI(movieId) {
        this.setState({
            isLoading: true,
        }, function() {
            return fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + Config.THEMOVIEDB_API_KEY)
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        isLoading: false,
                        dataSource: responseJson,
                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { navigation } = nextProps;
        const movieId = navigation.getParam('movieId');
        this.updateDetailsFromAPI(movieId);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId');
        this.updateDetailsFromAPI(movieId);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <MainHeader 
                        title={this.state.title}
                    />
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ScrollView>
                <MainHeader
                    title='Movie'
                />
                <Text style={styles.titleText}>{this.state.dataSource.title}</Text>
                <Divider style={{ backgroundColor: '#000' }} />
                <Image 
                    source={{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.dataSource.poster_path }}
                    style={{ width: 500, height: 500 }}
                />
                <Text style={styles.bodyText}>{this.state.dataSource.overview}</Text>
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

export default withNavigation(MovieDetails);
