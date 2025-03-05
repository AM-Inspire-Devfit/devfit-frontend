import styled from 'styled-components';

export const CalendarContainer = styled.div`
    margin-bottom: 100px;
    max-width: 530px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

    display: flex;
    flex-direction: column;
    align-items: flex-start;  

    .react-calendar {
    font-family: Arial, sans-serif;
    border: none;
}

.react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.react-calendar__navigation button {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #4f4f4f;
    cursor: pointer;
}
    .react-calendar__navigation button:hover {
    color: #c4c4c4;
}

.react-calendar__month-view__weekdays {
    display: grid;
    font-size: 14px;
    font-weight: bold;
    color: #888888;
    text-align: center;
    margin-bottom: 10px;
}

.react-calendar__tile {
    text-align: center;
    padding: 0;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; /* 수직 정렬 */
    justify-content: flex-start;
    position: relative;
    width: auto; /* 상위 요소 크기에 맞추기 */
    height: auto; /* 상위 요소 크기에 맞추기 */
    margin: 25px 0px;
}

.react-calendar__tile--now {
    color: #4F3DBD; /* 오늘 날짜의 숫자 색상 */
    font-weight: bold; /* 강조 */
}

.react-calendar__tile--active {
    background-color: #4F3DBD; /* 선택된 날짜의 배경색 */
    color: white; /* 선택된 날짜의 숫자 색상 */
    font-weight: bold;
    border-radius: 0%; /* 선택된 날짜만 원형 */
    display: flex;
    align-items: center;
    justify-content: center;
}
    
.react-calendar__tile:hover {
    background-color: #EEEAFF;
    color: #4F3DBD;
}
.react-calendar__tile--active:hover {
    background-color: #4F3DBD;
    color: white;
    border-radius: 0%;
}
.event {
    background-color: #796AD9;
    color: white;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 5px;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
}

`;
