
import React, { Component } from 'react';
import { withNavigation, SafeAreaView, DrawerItems } from 'react-navigation';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify'

class SideMenu extends Component {

    constructor(props) {
        super(props);
    }

    signout() {
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...this.props} />
                    </SafeAreaView>
                </ScrollView>
                <Button
                    title='Logout'
                    buttonStyle={{ backgroundColor: "#FF9900" }}
                    onPress={() => {
                        this.signout()
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default withNavigation(SideMenu);
