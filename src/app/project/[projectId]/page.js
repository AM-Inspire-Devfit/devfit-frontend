import Project from '../project';
import Navbar from '@/components/Navbar';

export default function ProjectPage({ params }){
    return(
        <>
        <Navbar projectId={params.projectId}/>
        <Project projectId={params.projectId}/>
        </>
        
    )
}