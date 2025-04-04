import Project from '../../project';
import Navbar_ from '@/components/Navbar_b';

export default function ProjectVPage({ params }){
    return(
        <>
        <Navbar_/>
        <Project projectId={params.projectId}/>
        </>
        
    )
}