/**
 * Demo React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon, Text, Header } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class MainHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title || '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.state.title) {
            this.setState({
                title: nextProps.title
            });
        }
    }

    renderHeaderLeftComponent() {
        return (
            <Icon
                name='menu'
                color='#000'
                onPress={() => {
                    this.props.navigation.toggleDrawer();
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
        if ('Home' === this.props.navigation.state.key) {
            return null;
        }
        
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

export default withNavigation(MainHeader);
