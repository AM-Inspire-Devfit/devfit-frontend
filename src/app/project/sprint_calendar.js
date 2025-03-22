import { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CalendarContainer } from "../../components/calander_s";

const SprintCalendar = ({ sprintStart, sprintEnd, meetingData = [], onMeetingClick }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date(sprintStart));
    const [isFirstWeek, setIsFirstWeek] = useState(true);

    useEffect(() => {
        setCurrentWeekStart(new Date(sprintStart));
        setIsFirstWeek(true);
    }, [sprintStart]);

    const weekDays = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"], []);

    const weekData = useMemo(() => {
        const startDate = new Date(currentWeekStart);
        const dayOfWeek = startDate.getDay();
        const mondayDate = new Date(startDate);
        mondayDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
        return weekDays.map((day, index) => {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + index);
            const formattedDate = date.toISOString().split("T")[0];
    
            const meetings = meetingData.filter(meet => meet.date === formattedDate);
    
            return {
                day,
                date: date >= new Date(sprintStart) && date <= new Date(sprintEnd)
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
    
            // 되돌아가서 sprintStart와 같은 주인지 확인
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
            // 첫 주 → 다음 주는 sprintStart 기준으로 월요일 이동
            const start = new Date(sprintStart);
            const day = start.getDay();
            const nextMonday = new Date(start);
            nextMonday.setDate(start.getDate() + (day === 0 ? 1 : 8 - day));

            // 다음 주가 sprintEnd가 포함된 주 이하인지 확인
            const nextWeekEnd = new Date(nextMonday);
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);

            if (sprintEndDate >= nextMonday) {
                setCurrentWeekStart(nextMonday);
                setIsFirstWeek(false);
            }
        } else {
            const newStart = new Date(currentWeekStart);
            newStart.setDate(newStart.getDate() + 7);

            const newEnd = new Date(newStart);
            newEnd.setDate(newEnd.getDate() + 6);

            // 다음 주가 sprintEnd가 포함된 주 이하인지 확인
            if (sprintEndDate >= newStart) {
                setCurrentWeekStart(newStart);
            }
        }
    };

    const lastValidDate = weekData.findLast((item) => item.date !== " ")?.date;

    const colorPalette = ["#FFC4C4", "#FFD5A5", "#FFF4A3", "#C4F4FF", "#E2C4FF"]; 

    // 날짜와 회의 순서를 기반으로 색상 배정
    const getColorForMeeting = (date, idx) => {
        const dateHash = date.split("-").reduce((acc, val) => acc + parseInt(val, 10), 0);
        return colorPalette[(dateHash + idx) % colorPalette.length];
    };

    const handleMeetingClick = (meeting) => {
        if (onMeetingClick) {
            onMeetingClick(meeting); 
        }
    };

    const getWeekEndDate = (date, isFirst, sprintEnd) => {
        const start = new Date(date);
    
        // 현재 주의 월요일 계산
        const day = start.getDay();
        const monday = new Date(start);
        monday.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
    
        // 현재 주의 일요일
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
    
        const sprintEndDate = new Date(sprintEnd);
    
        // 이번 주가 sprintEnd를 포함하고 있다면, 그 날짜까지만
        if (sprintEndDate >= monday && sprintEndDate <= sunday) {
            return sprintEndDate;
        }
    
        // 첫 주이면 sprintStart ~ 일요일
        if (isFirst) {
            return sunday;
        }
    
        // 일반적인 주이면 월요일~일요일
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
                    {formatDateString(currentWeekStart, true)} - {formatDateString(getWeekEndDate(currentWeekStart, isFirstWeek, sprintEnd))}
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
                            <div key={i} className="time-slot">{8 + i}:00</div>
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
                                    .sort((a, b) => a.startTime.localeCompare(b.startTime)) // 미팅 시간순 정렬
                                    .map((meet, idx) => {
                                    // 시간대 위치 계산
                                    const startHour = parseInt(meet.startTime.split(":")[0], 10);
                                    const endHour = parseInt(meet.endTime.split(":")[0], 10);
                                    const startMinutes = parseInt(meet.startTime.split(":")[1], 10);
                                    const endMinutes = parseInt(meet.endTime.split(":")[1], 10);
                                    
                                    const topPosition = ((startHour - 8) * 40) + (startMinutes / 60 * 40); 
                                    const height = ((endHour - startHour) * 40) + ((endMinutes - startMinutes) / 60 * 40);
                                    
                                    // 순차적으로 색상 배정
                                    const assignedColor = getColorForMeeting(meet.date, idx);

                                    return (
                                        <div 
                                            key={idx} 
                                            className="meeting-block"
                                            style={{ 
                                                top: `${topPosition}px`, 
                                                height: `${height}px`,
                                                backgroundColor: assignedColor,
                                                cursor: "pointer"
                                                
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