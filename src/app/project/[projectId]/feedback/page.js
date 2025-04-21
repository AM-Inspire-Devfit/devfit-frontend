import Navbar from '@/components/Navbar';
import PeerReview from '../../../feedback/feedback';
import { use } from 'react';

export default function PeerReviewPage({ params }){
    const { projectId } = use(params);

    return(
        <>
        <Navbar projectId={projectId}/>
        <PeerReview projectId={projectId}/>
        </>
    )
}