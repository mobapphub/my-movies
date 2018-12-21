/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import { Text, Tile } from 'react-native-elements';
import { withNavigation, SafeAreaView } from 'react-navigation';
import GridView from 'react-native-super-grid';
import Config from '../config';
import MainHeader from '../components/main-header';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export class Home extends Component {
    static navigationOptions = {
        title: 'Top Movies',
        drawerLabel: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            title: Home.navigationOptions.title,
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
                <SafeAreaView style={styles.container}>
                    <MainHeader 
                        title={this.state.title}
                    />
                    <ActivityIndicator />
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView>
                <MainHeader 
                    title={this.state.title}
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
            </SafeAreaView>
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

export default withNavigation(Home);
