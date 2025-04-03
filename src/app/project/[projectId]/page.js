import Project from '../project';
import Navbar from '@/components/Navbar';

export default function ProjectPage({ params }){
    const projectId = params.teamId;
    return(
        <>
        <Navbar/>
        <Project projectId={params.projectId}/>
        </>
        
    )
}