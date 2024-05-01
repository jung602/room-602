import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


export default function Loading() {
    return(
            <SkeletonTheme baseColor="#990" highlightColor="#550">
                {" "}
                Loading...
            </SkeletonTheme>
    );
}