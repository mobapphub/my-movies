/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a4f9abbcf3d616a410e63049322658b9')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.results,
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
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={({ item }) =>
                    <View style={styles.item}>
                        <Text h1 style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.subtitleText}>Release {item.release_date}</Text>
                        <Image
                            source={{
                                uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path
                            }}
                            style={{ width: 500, height: 500 }}
                        />
                    </View>
                }
                keyExtractor={(item, index) => item.id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 18,
        padding: 5,
    },
});
