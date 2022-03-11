import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native'

export default async function openLink(link) {
    const url = link
    try {
        const isAvailable = await InAppBrowser.isAvailable()
        if (isAvailable) {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#453AA4',
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                navigationBarColor: 'black',
                navigationBarDividerColor: 'white',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'sea-of-food': 'sea-of-food'
                }
            })
            alert(JSON.stringify(result))
        }
        else Linking.openURL(url)
    } catch (error) {
        Linking.openURL(url)
        alert(error.message)
    }
}