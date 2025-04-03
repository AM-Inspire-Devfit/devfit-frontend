import Team from '../team';
import Navbar_ from '@/components/Navbar_b';


export default function TeamPage({ params }){
    
    return(
        <>
        <Navbar_ />
        <Team teamId={params.teamId} />
        </>
        
    )
}