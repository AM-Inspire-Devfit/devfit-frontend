import { useState, useEffect, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CalendarContainer } from "../../components/calander_s";

const SprintCalendar = ({ sprintStart, sprintEnd, meetingData }) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date(sprintStart));

    useEffect(() => {
        setCurrentWeekStart(new Date(sprintStart));
    }, [sprintStart]);

    const weekDays = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"], []);

    const weekData = useMemo(() => {
        const startDate = new Date(currentWeekStart);
        const dayOfWeek = startDate.getDay();

        // 현재 날짜 기준으로 해당 주의 월요일 찾기
        const mondayDate = new Date(startDate);
        mondayDate.setDate(startDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        return weekDays.map((day, index) => {
            const date = new Date(mondayDate);
            date.setDate(mondayDate.getDate() + index);

            // 해당 날짜의 회의 정보 찾기
            const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환
            const meetings = meetingData?.filter(meet => meet.date === formattedDate) || [];

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
        if (newStart <= new Date(sprintEnd)) setCurrentWeekStart(newStart);
    };

    // sprint 기간 내 마지막 날짜 가져오기
    const lastValidDate = weekData.findLast((item) => item.date !== " ")?.date;

    return (
        <CalendarContainer>
            <div className="calendar-header">
                <button onClick={handlePrevWeek} className="nav-button">
                    <AiOutlineLeft size={20} />
                </button>
                <span className="date-range">
                    {currentWeekStart.toLocaleDateString()} - {lastValidDate}
                </span>
                <button onClick={handleNextWeek} className="nav-button">
                    <AiOutlineRight size={20} />
                </button>
            </div>
            <div className="calendar-wrapper">
                <div className="calendar-header-row">
                    <div className="time-column-header"></div> {/* 시간대 빈 칸 */}
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
                            <div key={i} className="time-slot">{9 + i}:00</div>
                        ))}
                    </div>

                    <div className="grid-lines">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="grid-line"></div>
                        ))}
                    </div>

                    <div className="vertical-lines">
                        {weekData.map((item, i) => (
                                <div key={i} className="vertical-line">
                                    {item.meetings.map((meet, idx) => (
                                        <div key={idx} className="meeting-label">
                                            {meet.title} ({meet.startTime} - {meet.endTime})
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </CalendarContainer>
    );
};

export default SprintCalendar;