/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Tile, Header } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Config from '../config'

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export class Home extends Component {
    static navigationOptions = {
        title: 'Top Movies',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + Config.THEMOVIEDB_API_KEY)
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
                    <Header
                        leftComponent={{ icon: 'menu', color: '#000' }}
                        centerComponent={{ text: Home.navigationOptions.title, style: { color: '#000' } }}
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
                    centerComponent={{ text: Home.navigationOptions.title, style: { color: '#000' } }}
                    rightComponent={{ icon: 'home', color: '#000' }}
                    backgroundColor='#fff'
                />
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
                            onPress={() => {
                                this.props.navigation.navigate('Detail', {
                                    movieId: item.id,
                                });
                            }}
                        >
                            <View>
                                <Text style={styles.subtitleText}>Release {item.release_date}</Text>
                            </View>
                        </Tile>
                    }
                />
            </View>
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
