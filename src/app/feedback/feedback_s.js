import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    background: #ffffff;
`;

export const Header = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: #2E1A86;
    margin-bottom: 20px;
`;

export const SprintTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: bold;
    color: #6959AC;
    margin-top: 40px;
    padding: 10px;
    cursor: pointer;

    &:hover {
    
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const TableHead = styled.thead`
    background: none;
    color: black;
    border-bottom: 2px solid #5A3EC8;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #F5F5F5;
    }
`;

export const TableHeader = styled.th`
    padding: 12px;
    margin-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    font-size: 16px;
`;

export const TableCell = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
`;

export const HighlightedText = styled.span`
    background-color: #A9B5F5;
    font-weight: bold;
`;

export const EmptyMessage = styled.div`
    padding: 20px;
    font-size: 16px;
    color: gray;
    text-align: center;
`;