import { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CalendarContainer } from "../../components/calander_s";

const SprintCalendar = ({sprintStart, sprintEnd, meetingData = [], onMeetingClick }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(sprintStart));
  const [isFirstWeek, setIsFirstWeek] = useState(true);

  useEffect(() => {
    setCurrentWeekStart(new Date(sprintStart));
    setIsFirstWeek(true);
  }, [sprintStart]);

  // weekDays 배열은 고정
  const weekDays = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"], []);

  // 현재 주의 날짜와 해당 날짜에 속하는 미팅을 계산  
  // meetingData는 이미 { date, startTime, endTime, title, ... } 형태임
  const weekData = useMemo(() => {
    const startDate = new Date(currentWeekStart);
    const dayOfWeek = startDate.getDay();
    const mondayDate = new Date(startDate);
    mondayDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    return weekDays.map((day, index) => {
      const date = new Date(mondayDate);
      date.setDate(mondayDate.getDate() + index);
      // ISO 형식의 날짜 문자열 (예: "2026-03-01")를 비교에 사용
      const formattedDate = date.toISOString().split("T")[0];

      // meeting.date는 API에서 넘어온 값 (ISO 날짜 또는 "YYYY-MM-DD" 형식)라고 가정
      const meetings = meetingData.filter((meet) => meet.date === formattedDate);
      return {
        day,
        date:
          date >= new Date(sprintStart) && date <= new Date(sprintEnd)
            ? `${date.getMonth() + 1}.${date.getDate()}`
            : " ",
        meetings,
      };
    });
  }, [currentWeekStart, sprintStart, sprintEnd, meetingData, weekDays]);

  const handlePrevWeek = () => {
    if (!isFirstWeek) {
      const newStart = new Date(currentWeekStart);
      newStart.setDate(newStart.getDate() - 7);
      const start = new Date(sprintStart);
      const day = start.getDay();
      const monday = new Date(start);
      monday.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
      if (newStart <= monday) {
        setCurrentWeekStart(new Date(sprintStart));
        setIsFirstWeek(true);
      } else {
        setCurrentWeekStart(newStart);
      }
    }
  };

  const handleNextWeek = () => {
    const sprintEndDate = new Date(sprintEnd);
    if (isFirstWeek) {
      const start = new Date(sprintStart);
      const day = start.getDay();
      const nextMonday = new Date(start);
      nextMonday.setDate(start.getDate() + (day === 0 ? 1 : 8 - day));
      const nextWeekEnd = new Date(nextMonday);
      nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
      if (sprintEndDate >= nextMonday) {
        setCurrentWeekStart(nextMonday);
        setIsFirstWeek(false);
      }
    } else {
      const newStart = new Date(currentWeekStart);
      newStart.setDate(newStart.getDate() + 7);
      if (sprintEndDate >= newStart) {
        setCurrentWeekStart(newStart);
      }
    }
  };

  // 미팅 블록 색상 할당 (임의로 colorPalette를 사용)
  const colorPalette = ["#FFC4C4", "#FFD5A5", "#FFF4A3", "#C4F4FF", "#E2C4FF"];
  const getColorForMeeting = (dateStr, idx) => {
    const dateHash = dateStr.split("-").reduce((acc, val) => acc + parseInt(val, 10), 0);
    return colorPalette[(dateHash + idx) % colorPalette.length];
  };

  const handleMeetingClick = (meeting) => {
    if (onMeetingClick) onMeetingClick(meeting);
  };

  // 주간 달력의 종료 날짜 계산
  const getWeekEndDate = (date, isFirst, sprintEnd) => {
    const start = new Date(date);
    const day = start.getDay();
    const monday = new Date(start);
    monday.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const sprintEndDate = new Date(sprintEnd);
    if (sprintEndDate >= monday && sprintEndDate <= sunday) return sprintEndDate;
    return sunday;
  };

  const formatDateString = (date, includeYear = false) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return includeYear ? `${year}.${month}.${day}` : `${month}.${day}`;
  };

  return (
    <CalendarContainer>
      <div className="calendar-header">
        <button onClick={handlePrevWeek} className="nav-button">
          <AiOutlineLeft size={20} />
        </button>
        <span className="date-range">
          {formatDateString(currentWeekStart, true)} -{" "}
          {formatDateString(getWeekEndDate(currentWeekStart, isFirstWeek, sprintEnd))}
        </span>
        <button onClick={handleNextWeek} className="nav-button">
          <AiOutlineRight size={20} />
        </button>
      </div>
      <div className="calendar-wrapper">
        <div className="calendar-header-row">
          <div className="time-column-header"></div>
          {weekData.map((item, index) => (
            <div key={index} className="calendar-header-cell">
              <div className="weekday">{item.day}</div>
              <div className="date">{item.date}</div>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          <div className="time-column">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="time-slot">
                {8 + i}:00
              </div>
            ))}
          </div>
          <div className="grid-lines">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="grid-line"
                style={{ height: i === 0 ? "0px" : "40px" }}
              ></div>
            ))}
          </div>
          <div className="vertical-lines">
            {weekData.map((item, colIndex) => (
              <div key={colIndex} className="vertical-line">
                {item.meetings
                  .sort((a, b) => {
                    // startTime는 "HH:mm" 형식이므로 비교
                    const aTime = a.startTime.split(":").map(Number);
                    const bTime = b.startTime.split(":").map(Number);
                    if (aTime[0] !== bTime[0]) return aTime[0] - bTime[0];
                    return aTime[1] - bTime[1];
                  })
                  .map((meet, idx) => {
                    // 미팅의 시작 시간을 분리하여 계산
                    const [startH, startM] = meet.startTime.split(":").map(Number);
                    const [endH, endM] = meet.endTime.split(":").map(Number);
                    const topPosition = ((startH - 8) * 40) + (startM / 60 * 40);
                    const height = ((endH - startH) * 40) + ((endM - startM) / 60 * 40);
                    // meeting.date는 "YYYY-MM-DD"형식
                    const assignedColor = getColorForMeeting(meet.date, idx);
                    return (
                      <div
                        key={idx}
                        className="meeting-block"
                        style={{
                          top: `${topPosition}px`,
                          height: `${height}px`,
                          backgroundColor: assignedColor,
                          cursor: "pointer",
                        }}
                        onClick={() => handleMeetingClick(meet)}
                      >
                        {meet.title}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CalendarContainer>
  );
};

export default SprintCalendar;
