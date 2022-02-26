import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { MotiView } from '@motify/components'
// handelling the loading animation
import LottieView from 'lottie-react-native';

var animation = [
    require('../../assets/animations/loading1.json'),
    require('../../assets/animations/loading3.json'),
    require('../../assets/animations/loading4.json'),
    require('../../assets/animations/loading5.json'),
    require('../../assets/animations/loading6.json'),
    require('../../assets/animations/loading7.json'),
    require('../../assets/animations/loading8.json'),
    require('../../assets/animations/loading9.json'),
    require('../../assets/animations/loading10.json'),
    require('../../assets/animations/loading11.json'),
    require('../../assets/animations/loading12.json'),
    require('../../assets/animations/loading13.json'),
    require('../../assets/animations/loading14.json'),
    require('../../assets/animations/loading15.json'),
    require('../../assets/animations/loading16.json'),
    require('../../assets/animations/loading17.json'),
    //....
]
export default function LoadingIndicator({ size }) {
    // set a state for the animationindex than with useEffect will set the index to a randoom number between 0 and and the animation length
    const [animationIndex, setAnimationIndex] = useState(Math.floor((Math.random() * animation.length)));
    console.log("aaa---->", animationIndex)

    return (
        <LottieView
            source={animation[animationIndex]}
            autoPlay
            loop
        />
        // <MotiView
        //     from={{
        //         width: size,
        //         height: size,
        //         borderRadius: size / 2,
        //         borderWidth: 0,
        //         shadowOpacity: 0.3,

        //     }}
        //     animate={{
        //         width: size + 40,
        //         height: size + 40,
        //         borderRadius: size / 2 + 20,
        //         borderWidth: size / 10,
        //         shadowOpacity: 1,
        //     }}
        //     transition={{
        //         type: 'timing',
        //         duration: 1000,
        //         loop: true,
        //         repeatReverse: true,
        //     }}
        //     style={{
        //         width: size,
        //         height: size,
        //         borderRadius: size / 2,
        //         borderWidth: size / 20,
        //         borderColor: '#fff',
        //         shadowColor: '#fff',
        //         shadowOffset: { width: 0, height: 1 },
        //         shadowOpacity: 0.8,
        //         shadowRadius: 2
        //     }}
        // />

    );
};