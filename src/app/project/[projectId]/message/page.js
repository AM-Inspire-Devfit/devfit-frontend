import Navbar from '@/components/Navbar';
import Message from '../../../message/message';
import { use } from 'react';

export default function MessagePage({ params }){
    const { projectId } = use(params);

    return(
        <>
        <Navbar projectId={projectId}/>
        <Message projectId={projectId}/>
        </>
    )
}