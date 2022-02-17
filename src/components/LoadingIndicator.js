import React, { useCallback, useState, useRef, useMemo } from 'react';
import { MotiView } from '@motify/components'
// handelling the loading animation


export default function LoadingIndicator  ({ size }){

    return (
        <MotiView
            from={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 0,
                shadowOpacity: 0.3,

            }}
            animate={{
                width: size + 40,
                height: size + 40,
                borderRadius: size / 2 + 20,
                borderWidth: size / 10,
                shadowOpacity: 1,
            }}
            transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
                repeatReverse: true,
            }}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 20,
                borderColor: '#fff',
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2
            }}
        />
    );
};