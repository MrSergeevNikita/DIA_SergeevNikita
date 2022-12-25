import React from 'react'
import {Button, Image, View} from 'react-native'

const Header = () => {

    return (
        <View style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Button
                onPress={handlePress}
                source={{
                    uri: 'https://avatars.mds.yandex.net/i?id=d9d3c08e3a7c43140bf5b5f3739583de187f1620-7756591-images-thumbs&n=13'
                }}
                style={{
                    width: 45,
                    height: 45,
                }}/>
        </View>
    )
}

export default Header