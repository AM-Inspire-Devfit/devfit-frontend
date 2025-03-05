import styled from "styled-components";

export const CalendarContainer = styled.div`
    width: 100%;
    max-width: 900px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    
    .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        width: 100%;
    }

    .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        padding: 5px;
    }

    .date-range {
        font-size: 18px;
        font-weight: bold;
    }

    .calendar-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    /* 요일과 날짜 */
    .calendar-header-row {
        display: flex;
        border-bottom: 4px solid #9087CA;
        height: 40px;
        align-items: center;
    }

    .time-column-header {
        width: 60px;
    }

    .calendar-header-cell {
        flex: 1;
        text-align: center;
        font-weight: bold;
        padding: 10px;
    }

    .weekday {
        font-size: 15px;
        font-weight: bold;
        color: #2E1A86;
        min-height: 20px; 
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3px;
    }

    .date {
        font-size: 14px;
        color: #444;
        min-height: 20px; 
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3px;
    }

    /* 시간대와 달력 */
    .calendar-body {
        display: grid;
        grid-template-columns: 60px 1fr; 
        width: 100%;
        align-items: stretch;
        position: relative;
    }

    .time-column {
        display: flex;
        flex-direction: column;
        width: 60px;
        border-right: 2px solid #9087CA;
        align-items: stretch;
    }

    .time-slot {
        font-size: 12px;
        padding: 11px 12px;
        text-align: right;
        border-bottom: 1px solid #9087CA;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .grid-lines {
        position: absolute;
        top: 0;
        left: 60px; /* 시간 칸 제외 */
        right: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .grid-line {
        flex: 1;
        border-bottom: 1px solid #C5BCFF;
    }

    .vertical-lines {
        position: absolute;
        top: 0;
        left: 60px; /* 시간 칸 제외 */
        right: 0;
        height: 100%;
        display: flex;
    }

    .vertical-line {
        flex: 1;
        border-right: 1px solid #C5BCFF; 
    }

    .vertical-line:last-child {
        border-right: none;
    }
`;