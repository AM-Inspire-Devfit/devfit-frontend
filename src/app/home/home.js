"use client";
import React, { useState, useRef, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TeamCreateModal from "@/components/modals-sw/TeamCreateModal";
import ProfileModal from "@/components/modals-sw/ProfileModal";
import TeamJoinModal from "@/components/modals-sw/TeamJoinModal";
import axios from "axios";
import { ClipLoader } from "react-spinners"; 
import * as S from "./home_s";

export default function Home() {
  // 액세스 토큰
  const homeUrl = process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI;
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // 드롭다운 관련
  const [selectedId, setSelectedId] = useState(null);
  const menuRefs = useRef([]);

  // 모달 관련
  const [isModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // 프로필 정보
  const [profile, setProfile] = useState({
    nickname: "",
    profileImageUrl: "",
  });

  // ---------------------------
  // (A) 프로필 불러오기
  // ---------------------------

  const fetchProfile = async () => {
    if (!accessToken) return;
    try {
      const res = await axios.get(
        `${homeUrl}/members/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("프로필 응답:", res.data);
      setProfile({
        nickname: res.data.data.nickname || "",
        profileImageUrl: res.data.data.profileImageUrl || "",
      });
    } catch (error) {
      console.error("프로필 정보 조회 실패:", error.response?.data || error.message);
    }
  }



  useEffect(() => {
   
    fetchProfile();
  }, [accessToken]);

  // ---------------------------
  // (B) 팀 목록 (lastTeamId 기반)
  // ---------------------------
  const [cards, setCards] = useState([]);
  const [lastTeamId, setLastTeamId] = useState(null); // 첫 페이지: null
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // 중복 요청 방지용

  // 팀 목록 불러오기 함수
  const fetchTeams = async () => {
    if (!accessToken) return;
    if (isFetching || !hasMore) return; // 이미 요청 중이거나 더 이상 불러올 데이터 없으면 중단

    setIsFetching(true);
    try {
      const res = await axios.get(
        `${homeUrl}/teams/list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
        setCards((prev) => [...prev, ...newContent]);

        // 마지막 아이템의 teamId를 nextLastId로
        const nextLastId = newContent[newContent.length - 1].teamId;
        setLastTeamId(nextLastId);
      }

      // last === true 이면 더 이상 페이지 없음
      if (isLastPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("팀 목록 조회 실패:", error.response?.data || error.message);
    } finally {
      setIsFetching(false);
    }
  };

  // 첫 마운트 시 첫 페이지 로드
  useEffect(() => {
    fetchTeams();
  }, [accessToken]);

  // ---------------------------
  // (C) 스크롤 이벤트 핸들러
  // ---------------------------
  const handleScroll = () => {
    if (!hasMore || isFetching) return; // 더 이상 데이터 없거나 이미 요청 중이면 중단

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    // 스크롤이 거의 바닥이면 다음 데이터 요청
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchTeams();
    }
  };

  // 스크롤 이벤트 등록/해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isFetching]);

  // ---------------------------
  // (D) 드롭다운 외부 클릭 닫기
  // ---------------------------
  const handleMenuToggle = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId]);

const handleTeamAdded = () => {
    // 목록 상태를 초기화하거나, 페이지를 1로 되돌린 후 재요청
    setLastTeamId(null);
    setCards([]);
    setHasMore(true);
    fetchTeams(); // 팀 목록 다시 로드
  };
  // 팀 삭제 함수
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

    // 성공 시, 로컬 상태에서 해당 팀 제거
    setCards((prevCards) => prevCards.filter((team) => team.teamId !== teamId));
  } catch (error) {
    console.error("팀 삭제 실패:", error.response?.data || error.message);
  }
};


  // ---------------------------
  // (E) 렌더링
  // ---------------------------
  return (
    <>
      <S.PageContainer>
        {/* ------------------ 프로필 영역 ------------------ */}
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

        {/* ------------------ 팀 목록 영역 ------------------ */}
        <S.OptionContainer>
          <S.TeamOptionContainer>
            <S.OptionTitle>나의 팀</S.OptionTitle>
            <S.TeamButton onClick={() => setIsCreateModalOpen(true)}>
              <S.TeamIcon src={"/img/team/team-create-icon.png"} alt="팀 생성 아이콘" />
              팀 생성
            </S.TeamButton>

            <S.Divider />

            <S.TeamButton onClick={() => setIsJoinModalOpen(true)}>
              <S.TeamIcon src="/img/team/team-join-icon.png" alt="팀 참여 아이콘" />
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
    // ✅ 로딩 중이면 카드 대신 스피너만 보여주기
    <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "40px" }}>
      <ClipLoader size={50} color="#7b4fc3" />
    </div>
  ) : (<>
              {cards.map((team) => (
                <S.TeamCard key={team.teamId} role="button"  onClick={() => {
                  window.location.href = `/team/${team.teamId}`;
                }}>
                  <S.TitleContainer>
                    <S.Title>{team.teamName}</S.Title>
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

                  <S.Description>{team.teamDescription}</S.Description>
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
                    <S.Icon src="/img/profile_sample.jpg" alt="icon" />
                    <S.Icon src="/img/profile_sample.jpg" alt="icon" />
                    <S.Icon src="/img/profile_sample.jpg" alt="icon" />
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
