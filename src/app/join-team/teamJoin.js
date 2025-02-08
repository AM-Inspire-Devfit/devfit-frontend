"use client";
import { TeamJoinContainer ,Title, Button} from "./teamJoin_s";
import Image from "next/image";
export default function TeamJoin(){
    return(
        
            <TeamJoinContainer>
                
                <Title>팀 생성/참여</Title>
                <Button><Image
          src="/img/team/team-create-icon.png"
          alt="Kakao"
          width={40}
          height={40}
        />
        팀 생성
        </Button>
        <Button><Image
          src="/img/team/team-join-icon.png"
          alt="Kakao"
          width={40}
          height={40}
        />
        팀 참여
        </Button>
            </TeamJoinContainer>


    );
}