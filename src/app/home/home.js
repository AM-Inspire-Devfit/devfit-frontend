"use client";
import React, { useState , useRef, useEffect} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TeamCreateModal from "@/components/modals-sw/TeamCreateModal";
import ProfileModal from "@/components/modals-sw/ProfileModal"; 

import * as S from "./home_s";
export default function Home(){
  const[selectedId, setSelectedId] = useState(null);
  const menuRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  //axios로 받아오기
  const cards = [
        { id: 0, title: "SideEffect", desc: "LG CNS 개발 스터디", img: "/grape.png" },
        { id: 1, title: "Samsung", desc: "LG CNS 개발 스터디", img: "/blueberry.png" },
        {id: 2,  title: "SK", desc: "LG CNS 개발 스터디", img: "/banana.png" },
        { id: 3, title: "Kakao Pay", desc: "LG CNS 개발 스터디", img: "/grape.png" },
        { id: 4, title: "SideEffect", desc: "LG CNS 개발 스터디", img: "/grape.png" },
        { id: 5, title: "Samsung", desc: "LG CNS 개발 스터디", img: "/blueberry.png" },
        {id: 6,  title: "SK", desc: "LG CNS 개발 스터디", img: "/banana.png" },
        { id: 7, title: "Kakao Pay", desc: "LG CNS 개발 스터디", img: "/grape.png" },
        
      ];

    


  const handleMenuToggle = (id) => {
    setSelectedId((prevId)=>(prevId === id ? null : id));
  };



  useEffect(() => {
    function handleClickOutside(event) {
      if (selectedId !== null) {
        const selectedMenu = menuRefs.current[selectedId];
        if (selectedMenu && !selectedMenu.contains(event.target)) {
          setSelectedId(null);
        }
      }
    }
    
      document.addEventListener("mousedown", handleClickOutside);
      return()=>{
        document.removeEventListener("mousedown", handleClickOutside);
      };
     }, []);

  return(

  <>
  <S.PageContainer>
      <S.ProfileContainer>
          <S.ProfileImage src={"/img/profile_sample.jpg" } alt={"Profile Image"} /> 
          <S.ProfileName>최현태</S.ProfileName>
          <S.InfoUpdateButton onClick={() => setIsProfileModalOpen(true)}>기본 정보 수정</S.InfoUpdateButton>
          <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      </S.ProfileContainer>
      
      <S.OptionContainer>
      <S.TeamOptionContainer>
        <S.OptionTitle>나의 팀</S.OptionTitle>
        
        <S.TeamButton onClick={() => setIsModalOpen(true)}>
            <S.TeamIcon src={"/img/team/team-create-icon.png"} alt="팀 생성 아이콘" />
            팀 생성
        </S.TeamButton>

        <S.Divider />

        <S.TeamButton>
            <S.TeamIcon src="/img/team/team-join-icon.png" alt="팀 참여 아이콘" />
            팀 참여
        </S.TeamButton>
        <TeamCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </S.TeamOptionContainer>

        
        
        {(cards.length===0) ? (
          <S.EmptyFiller>
            <p>참여 중인 팀이 없습니다!</p>
            <p>새로운 팀을 생성하세요</p>
          </S.EmptyFiller>) : 
        (<S.CardContainer>{
        cards.map((card, index) => (
          <S.TeamCard key={card.id} role="button">
            <S.TitleContainer>
              <S.Title>{card.title}</S.Title>
              <S.MoreButton onClick={(e) => {
                e.stopPropagation(),
                handleMenuToggle(card.id)
                }}>
                <MoreVertIcon style={{ fontSize: "24px", color: "#7b4fc3", padding: "4px" }} />
              </S.MoreButton>
            </S.TitleContainer>
            <S.Description>{card.desc}</S.Description>
        

            <S.DropdownMenu ref={(el)=>(menuRefs.current[index]=el)} $isOpen={selectedId === card.id}>
              <S.MenuItem>팀원 초대</S.MenuItem>
              <S.MenuItem>팀 나가기</S.MenuItem>
              <S.MenuItem>팀 삭제</S.MenuItem>
            </S.DropdownMenu>
        
        
            <S.IconContainer>
              <S.Icon src="/img/profile_sample.jpg" alt="icon" />
              <S.Icon src="/img/profile_sample.jpg" alt="icon" />
              <S.Icon src="/img/profile_sample.jpg" alt="icon" />
            </S.IconContainer>
          </S.TeamCard>
        ))}    
        
      </S.CardContainer>)}
    </S.OptionContainer>
  </S.PageContainer>
  </>
  );

}
