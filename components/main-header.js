/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon, Text, Header } from 'react-native-elements';

export class MainHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || '',
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.title || '',
        });
    }

    renderHeaderLeftComponent() {
        return (
            <Icon
                name='menu'
                color='#000'
                onPress={() => {
                    this.props.navigation.navigate('Home');
                }}
            />
        );
    }

    renderHeaderCenterComponent() {
        return (
            <Text h4
                style={{color: '#000'}}
            >
                {this.state.title}
            </Text>
        );
    }

    renderHeaderRightComponent() {
        return (
            <Icon
                name='home'
                color='#000'
                onPress={() => {
                    this.props.navigation.navigate('Home');
                }}
            />
        );
    }

    render() {
        return (
            <Header
                leftComponent={this.renderHeaderLeftComponent()}
                centerComponent={this.renderHeaderCenterComponent()}
                rightComponent={this.renderHeaderRightComponent()}
                backgroundColor='#fff'
            />
        );
    }
}
