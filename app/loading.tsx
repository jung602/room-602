import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './load.module.scss'


export default function Loading() {
    return(
            <SkeletonTheme>
                    <>
                        <div>Loading</div>
                    </>

            </SkeletonTheme>
    );
}