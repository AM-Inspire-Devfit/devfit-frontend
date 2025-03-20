import * as n from "./Navbar";
import Link from "next/link";
import Image from "next/image";

const Navbar_ = () => {

    return (
        <n.NavbarContainer>
            <Link href="/boarding/" passHref>
            <n.LogoContainer>
                <Image 
                    src="/img/devfit-logo.png" 
                    alt="Logo" 
                    width={110} 
                    height={60} />
            </n.LogoContainer>
            </Link>
            <n.NavLinks>
                <n.LogoutButton>Logout</n.LogoutButton>
            </n.NavLinks>
        </n.NavbarContainer>
    );
}

export default Navbar_;