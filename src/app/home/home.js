"use client";
import React, { useState, useRef, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TeamCreateModal from "@/components/modals-sw/TeamCreateModal";
import ProfileModal from "@/components/modals-sw/ProfileModal";
import TeamJoinModal from "@/components/modals-sw/TeamJoinModal";
import axios from "axios";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { ClipLoader } from "react-spinners"; 
import * as S from "./home_s";
import { useAlert } from "@/context/AlertContext";
import { AiOutlinePlus, AiOutlineUserAdd } from 'react-icons/ai';

export default function Home() {
  //액세스 토큰
  const homeUrl = process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const { showAlert } = useAlert();
  //드롭다운 관련
  const [selectedId, setSelectedId] = useState(null);
  const menuRefs = useRef([]);
  // 모달 관련
  const [isModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  //카드
  const [cards, setCards] = useState([]);
  const [lastTeamId, setLastTeamId] = useState(null); // 첫 페이지: null
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지용
  // 프로필 정보
  const [profile, setProfile] = useState({
    nickname: "",
    profileImageUrl: "",
  });
  // 팀 멤버
  const [teamAdmins, setTeamAdmins] = useState({});
  const [teamMembers, setTeamMembers] = useState({});

  const fetchProfile = async () => {
    try {
      console.log(localStorage.getItem("accessToken"))
      const res = await axiosWithAuthorization.get("/members/me");
 console.log(res)
      setProfile({
        nickname: res.data.data.nickname || "",
        profileImageUrl: res.data.data.profileImageUrl || "",
      });
    } catch (error) {
      showAlert("error", error.response?.data?.data?.message || "프로필 조회 실패");
      console.log(error.response?.data);
    }
  };
 
  

  const fetchTeams = async () => {
    if (isFetching || !hasMore) return; // 이미 요청 중이거나 더 이상 불러올 데이터 없으면 중단

    setIsFetching(true);
    try {
      const res = await axiosWithAuthorization.get(
        "/teams/list",
        {
          params: {
            // 첫 페이지는 lastTeamId=null
            lastTeamId: lastTeamId,
            size: 5,
          },
        }
      );
      console.log("팀 목록 응답:", res.data);

      // 구조 예시: { data: { content: [...], last: true/false }, ... }
      const newContent = res.data.data.content || [];
      const isLastPage = res.data.data.last; // 마지막 페이지 여부

      if (newContent.length === 0) {
        // 데이터가 비어 있으면 더 이상 불러올 게 없음
        setHasMore(false);
      } else {
        // 기존 목록 + 새로 가져온 목록
        setCards((prev) => {
          const existingIds = new Set(prev.map((team) => team.teamId));
          const uniqueNewContent = newContent.filter((team) => !existingIds.has(team.teamId));
          return [...prev, ...uniqueNewContent];
        });
        // 마지막 아이템의 teamId를 nextLastId로
        const nextLastId = newContent[newContent.length - 1].teamId;
        setLastTeamId(nextLastId);
      }

      // last === true 이면 더 이상 페이지 없음
      if (isLastPage) {
        setHasMore(false);
      }
    } catch (error) {
      showAlert("error", error.response?.data?.data?.message || "팀 목록 조회 실패");
      console.log(error.response?.data);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTeamAdmin = async (teamId) => {
    try {
      const res = await axiosWithAuthorization.get(`/teams/${teamId}/admin`);
      const adminProfile = res.data.data.profileImageUrl;
      setTeamAdmins((prev) => ({ ...prev, [teamId]: adminProfile }));
    } catch (error) {
      showAlert("error", error.response?.data?.data?.message || "팀장 조회 실패");
    }
  };

  const fetchTeamMembers = async (teamId) => {
    try {
      const res = await axiosWithAuthorization.get(`/members/${teamId}/list`, {
        params: { size: 2 }, // 2명만
      });
      const memberProfiles = res.data.data.content.map((m) => m.profileImageUrl);
      console.log(res.data.data)
      setTeamMembers((prev) => ({ ...prev, [teamId]: memberProfiles }));
    } catch (error) {
      showAlert("error", error.response.data.data.message);
      console.log(error.response.data);
    }
  };
  const handleScroll = () => {
    if (!hasMore || isFetching) return; // 더 이상 데이터 없거나 이미 요청 중이면 중단

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // 스크롤이 거의 바닥이면 다음 데이터 요청
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchTeams();
    }
  };
  const handleMenuToggle = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleTeamAdded = () => {
    //목록 상태를 초기화하거나, 페이지를 1로 되돌린 후 재요청
    setLastTeamId(null);
    setCards([]);
    setHasMore(true);
    fetchTeams();
  };
  const handleTeamDelete = async (teamId) => {
    if (!accessToken) return;
    try {
      // DELETE /teams/{teamId}
      await axios.delete(`${homeUrl}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`팀(${teamId}) 삭제 성공`);
  
      //성공 시 로컬 상태에서 해당 팀 제거
      setCards((prevCards) => prevCards.filter((team) => team.teamId !== teamId));
    } catch (error) {
      //에러
      showAlert("error", error.response.data.data.message);
      console.log(error.response.data);
    }
  };

  // 첫 마운트 시 첫 페이지 로드
  useEffect(() => {fetchProfile()}, [accessToken]);
  useEffect(() => {fetchTeams();}, [accessToken]);
  useEffect(() => {
    cards.forEach((team) => {
      if (!teamMembers[team.teamId]) {
        fetchTeamMembers(team.teamId);
      }
      if (!teamAdmins[team.teamId]) {
        fetchTeamAdmin(team.teamId);
      }
    });
  }, [cards]);

  // 스크롤 이벤트 등록/해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetching]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId]);


  // 팀 이름 4글자 이상이면 축약 표시
  const reduceName = (name) => {
    return name.length > 4 ? name.slice(0, 4) + ".." : name;
};

  // 팀 설명 10글자 이상이면 축약 표시
  const reduceDescription = (name) => {
    return name.length > 10 ? name.slice(0, 10) + ".." : name;
};

  return (
    <>
      <S.PageContainer>
        {/* ---------------------- 프로필 ---------------------- */}
        <S.ProfileContainer>
          <S.ProfileImage
            src={
              profile.profileImageUrl.trim() !== ""
                ? profile.profileImageUrl
                : "/img/profile_sample.jpg"
            }
            alt="Profile Image"
          />
          <S.ProfileName>
            {profile.nickname.trim() !== "" ? profile.nickname : "Unknown"}
          </S.ProfileName>
          <S.InfoUpdateButton onClick={() => setIsProfileModalOpen(true)}>
            기본 정보 수정
          </S.InfoUpdateButton>
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            profile={profile}                     
            onProfileUpdated={() => fetchProfile()}
          />
        </S.ProfileContainer>

        {/* ------------------ 팀 카드 목록 ------------------ */}
        <S.OptionContainer>
          <S.TeamOptionContainer>
            <S.OptionTitle>나의 팀</S.OptionTitle>
            <S.TeamButton onClick={() => setIsCreateModalOpen(true)}>
              <AiOutlinePlus size={25} style={{ marginRight: '8px' }} />
              팀 생성
            </S.TeamButton>

            <S.Divider />

            <S.TeamButton onClick={() => setIsJoinModalOpen(true)}>
              <AiOutlineUserAdd size={25} style={{ marginRight: '8px' }} />
              팀 참여
            </S.TeamButton>

            <TeamCreateModal
              isOpen={isModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onTeamCreated={handleTeamAdded} 
            />
            <TeamJoinModal
              isOpen={isJoinModalOpen}
              onClose={() => setIsJoinModalOpen(false)}
              onTeamJoined={handleTeamAdded}  
            />
          </S.TeamOptionContainer>

          {/* 팀 카드 목록 */}
          {cards.length === 0  && !isFetching ? (
            <S.EmptyFiller>
              <p>참여 중인 팀이 없습니다!</p>
              <p>새로운 팀을 생성하세요</p>
            </S.EmptyFiller>
          ) : (
            <S.CardContainer>
              {isFetching ? (
    //로딩 중이면 카드 대신 스피너만 보여주기
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "40px" }}>
      <ClipLoader size={50} color="#7b4fc3" />
    </div>
  ) : (<>
              {cards.map((team) => (
                <S.TeamCard key={team.teamId} role="button"  onClick={() => {
                  window.location.href = `/team/${team.teamId}`;
                }}>
                  <S.TitleContainer>
                    <S.Title>{reduceName(team.teamName)}</S.Title>
                    <S.MoreButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(team.teamId);
                      }}
                    >
                      <MoreVertIcon
                        style={{ fontSize: "24px", color: "#7b4fc3", padding: "4px" }}
                      />
                    </S.MoreButton>
                  </S.TitleContainer>

                  <S.Description style={{ visibility: team.teamDescription?.trim() ? 'visible' : 'hidden' }}>
                    {reduceDescription(team.teamDescription || "내용없음")}
                  </S.Description>
                  {team.teamEmoji && <S.CardEmoji>{team.teamEmoji}</S.CardEmoji>}

                  <S.DropdownMenu
                    ref={(el) => (menuRefs.current[team.teamId] = el)}
                    $isOpen={selectedId === team.teamId}
                  >
                    <S.MenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleTeamDelete(team.teamId);
                      }}>팀 삭제</S.MenuItem>
                  </S.DropdownMenu>

                  <S.IconContainer>
                    {(() => {
                      const adminUrl = teamAdmins[team.teamId] || "/img/profile_sample.jpg";
                      const memberUrls = (teamMembers[team.teamId] || []).slice(0, 2);;
                      const result = [adminUrl];
                      for (let i = 0; i < memberUrls.length; i++) {
                        result.push(memberUrls[i]);
                      }

                      return result.map((url, idx) => <S.Icon key={idx} src={url} alt="member" />);
                    })()}
                  </S.IconContainer>
                </S.TeamCard>
              ))}
              </>
            )}
            </S.CardContainer>
          )}
        </S.OptionContainer>
      </S.PageContainer>
    </>
  );
}
