"use client";

import Navbar from '@/components/Navbar';
import My from '../../../mypage/mypage';
import { use } from 'react';

export default function MyPage({ params }){
    const { projectId } = use(params);

    return(
        <>
            <Navbar projectId={projectId} />
            <My projectId={projectId} />
        </>
        
    )
}