import Task from '../../../../task/task';
import Navbar from '@/components/Navbar';

export default function TaskPage({ params }){
    const projectId = Number(params.projectId);
    return(
        <>
            <Navbar projectId={projectId}/>
            <Task projectId={projectId}/>
        </>
        
    )
}