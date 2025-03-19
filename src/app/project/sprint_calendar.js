import { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CalendarContainer } from "../../components/calander_s";

const SprintCalendar = ({ sprintStart, sprintEnd, meetingData = [], onMeetingClick }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date(sprintStart));

    useEffect(() => {
        setCurrentWeekStart(new Date(sprintStart));
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
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() - 7);
        if (newStart >= new Date(sprintStart)) setCurrentWeekStart(newStart);
    };

    const handleNextWeek = () => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() + 7);

        const nextWeekEnd = new Date(newStart);
        nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);

        if (nextWeekEnd >= new Date(sprintStart)) {
            setCurrentWeekStart(newStart);
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

    return (
        <CalendarContainer>
            <div className="calendar-header">
                <button onClick={handlePrevWeek} className="nav-button">
                    <AiOutlineLeft size={20} />
                </button>
                <span className="date-range">
                    {currentWeekStart.toLocaleDateString().replace(/\.$/, "")} - {lastValidDate}
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