import styled from 'styled-components';


export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 800px;
    min-height: 100px;
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);

    cursor: default;
    user-select: none;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 200px;
    margin: 0 auto;
    margin-top: 100px;
    padding: 20px;
    border-radius: 8px;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;  
`;

export const ProfileName = styled.div`
padding: 10px;
color: #333;
font-size: 30px;
font-weight: bold;

`

export const InfoUpdateButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  color: #555;
  margin-top: 10px;
  border-radius: 15px;
  border: 3px solid #d7caff;
  background-color: #fff;
  padding: 5px 10px;

  &:hover {
    color: #FFF;
    background-color: #d7caff;
  }
`
export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background-color: #F9F7FE;
  width: 600px;
  min-height: 500px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TeamOptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    min-height: 100px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px;
    border-bottom: 3px solid #7b4fc3;
    
`;


export const OptionTitle = styled.div`
  font-size: 30px;
  color: #7b4fc3;
  font-weight: 900;
  text-align: left;
  margin-right:100px;

`;
export const TeamButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #7b4fc3;
    font-size: 18px;
    font-weight: bold;
    
    &:hover {
        color: #5a3b9c;
    }
`;

export const TeamIcon = styled.img`
    width: 24px;
    height: 24px;
`;
export const CardEmoji = styled.span`
  display: block;
  min-height: 40px;
  line-height: 40px;
  font-size: 40px;     /* 이모지 크기 */
  text-align: center; 
  margin-top:20px; /* 수평 가운데 정렬 */
  margin-bottom: 20px;
`;

export const Divider = styled.div`
    width: 2px;
    height: 24px;
    background-color: #7b4fc3;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-auto-rows: 220px;
  gap: 16px;
  width: 100%;
  min-height: 220px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  `;

export const EmptyFiller = styled.div`
  font-size: 24px;
  color: #7b4fc3;
  font-weight: bold;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 200px;

`;

export const TeamCard = styled.div`
    position: relative; /* MoreButton 위치 기준 */
    width: 150px;
    height: 200px;
    background: white;
    border-radius: 12px;
    border-width: 0px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
`;



// 제목 스타일
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 양쪽 정렬 */
  width: 100%;
`;



export const Title = styled.h2`
  font-size: 1.2em;
  color: #7b4fc3;
  font-weight: 300;
  text-align: left;
  margin: 0;
  flex: 1;
`;

// 설명 텍스트
export const Description = styled.p`
  font-size: 10px;
  text-align: left;
  color: #6E65AB;
  margin-bottom: 10px;
`;

// 이미지 스타일
export const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ddd;  
    padding:30px;
`;



export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;  
  margin-left: -8px; 

  &:first-child {
    margin-left: 30px; 
  }
`;


// 더보기 버튼 (점 3개)
export const MoreButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #7b4fc3;

  &:hover {
    color: #5a3b9c;
  }
`;

// 드롭다운 메뉴 스타일
export const DropdownMenu = styled.div`
  position: absolute;
  top: 40px; /* 버튼 아래로 배치 */
  right: 0;
  background: #ebe5ff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 10px;
  width: 120px;
  display: ${(props) => (props.$isOpen ? "block" : "none")}; /* 클릭 시 보이도록 */
`;

// 메뉴 아이템 스타일
export const MenuItem = styled.div`
  font-size: 14px;
  padding: 8px 12px;
  color: #4c3790;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    background: #d7caff;
  }

  &:last-child {
    color: #333;
    font-weight: bold;
  }
`;


