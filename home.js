/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Tile } from 'react-native-elements';
import GridView from 'react-native-super-grid';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

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
            <GridView
                itemDimension={185}
                items={this.state.dataSource}
                renderItem={(item) =>
                    <Tile
                        imageSrc={{ uri: 'https://image.tmdb.org/t/p/w185' + item.poster_path }}
                        title={item.title}
                        titleStyle={styles.titleText}
                        width={(deviceWidth / 2) - 20}
                        height={deviceHeight / 2}
                    >
                        <View>
                            <Text style={styles.subtitleText}>Release {item.release_date}</Text>
                        </View>
                    </Tile>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: 'black',
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 18,
    },
});
