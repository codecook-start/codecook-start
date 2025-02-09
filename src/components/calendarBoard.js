import React from "react";
import { useState } from "react";
const CalendarBoard = (props) => {
    const month_day_usually = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const month_day_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [prev_flag, set_prev_flag] = useState(false);
    const [next_flag, set_next_flag] = useState(false);
    let year = [];
    const board_day = [];
    let prev_month = 0;
    let next_month = 0;
    let k = 0;
    let j = true;
    const { current_year, set_current_year, current_month, set_current_month, start_week_day, isLeap_year, isCurrent, today_day, button_click, set_button_click = set_button_click, current_day = current_day, set_current_day = set_current_day, current_select_month = { current_select_month }, set_current_select_month = { set_current_select_month } } = props;
    for (let i = current_year - 8; i <= current_year + 7; i++) {
        year.push(i);
    }
    if (current_month === 0) {
        prev_month = 11;
    }
    else {
        prev_month = current_month - 1;
    }
    if (next_month === 11) {
        next_month = 0;
    }
    else {
        next_month = current_month + 1;
    }
    const selectMonth = (index) => {
        set_current_month(index);
        set_button_click(0);
    }
    const selectYear = (index) => {
        set_current_year(index);
        set_button_click(0);
    }
    const selecteDay = (Item, index) => {
        set_current_day(Item);
        if (index <= start_week_day - 1) {
            set_current_select_month(prev_month);
            set_prev_flag(true);
            set_next_flag(false);
            console.log(index,start_week_day)
        }
        else {
            
            if (index < k) {
                console.log(index,k)
                set_current_select_month(current_month);
                set_prev_flag(false);
                set_next_flag(false);
            }
            else {
                set_current_select_month(next_month, index);
                set_prev_flag(false);
                set_next_flag(true);
            }
        }
        console.log(prev_flag,next_flag)
    }
    const current_day_today = () => {
        if (current_day === today_day) {
            return false;
        }
        else {
            return true;
        }
    }
    if (isLeap_year) {

        for (let i = month_day_leap[prev_month] - start_week_day + 1; i <= month_day_leap[prev_month]; i++) {
            board_day.push(i);
            k++;
        }
        for (let i = 1; i <= month_day_leap[current_month]; i++) {
            board_day.push(i);
            k++;
        }
        for (let i = 1; i <= (42 - k); i++) {
            board_day.push(i);
        }
    }
    else {


        for (let i = month_day_usually[prev_month] - start_week_day + 1; i <= month_day_usually[prev_month]; i++) {
            board_day.push(i);
            k++;
        }
        for (let i = 1; i <= month_day_usually[current_month]; i++) {
            board_day.push(i);
            k++;
        }
        for (let i = 1; i <= (42 - k); i++) {

            board_day.push(i);
        }
    }
    if (!current_day_today) { console.log("this is ssss") }
    if (button_click === 0) {
        return (
            <div>
                <ul className="weekdays">
                    <li>Su</li>
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>

                </ul>
                <ul className="days">
                    {

                        board_day.map((Item, index) => {
                            if (isCurrent) {

                                if (index <= start_week_day - 1) {
                                    if (prev_flag === true && Item === current_day) {
                                        return (<li key={index} className="select_day" onClick={() => selecteDay(Item, index)}>{Item}</li>);
                                    }
                                    else {
                                        return (<li key={index} className="prev_day" onClick={() => selecteDay(Item, index)}>{Item}</li>);
                                    }
                                }
                                else {
                                    if (Item === (today_day) && j) {
                                        j = false;
                                        return (
                                            <li key={index} className="today_day" onClick={() => selecteDay(Item, index)}>{Item}</li>
                                        )
                                    }
                                    if (index < k) {
                                        if (!next_flag&&!prev_flag&&Item === current_day) {
                                            return (<li key={index} className="select_day" onClick={() => selecteDay(Item, index)}>{Item}</li>);
                                        }
                                        else {
                                            return (
                                                <li key={index} className="main_day" onClick={() => selecteDay(Item, index)}>{Item}</li>
                                            )
                                        }
                                    }
                                    else {
                                        if (next_flag === true && Item === current_day) {
                                            return (<li key={index} className="select_day" onClick={() => selecteDay(Item, index)}>{Item}</li>);
                                        }
                                        else {

                                            return (
                                                <li key={index} className="next_day" onClick={() => selecteDay(Item, index)}>{Item}</li>
                                            )
                                        }
                                    }
                                }
                            }
                            else {
                                if (index <= (start_week_day - 1)) {
                                    return (<li key={index} className="prev_day" onClick={() => selecteDay(Item, index)}>{Item}</li>);
                                }
                                if (index < k) {
                                    return (

                                        <li key={index} className="main_day" onClick={() => selecteDay(Item, index)}>{Item}</li>
                                    )
                                }
                                else {
                                    return (
                                        <li key={index} className="next_day" onClick={() => selecteDay(Item, index)}>{Item}</li>
                                    )
                                }
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
    if (button_click === 1) {
        return (
            <div>
                <ul className="months">

                    {
                        month.map((item, index) => {
                            return (

                                <li key={index} onClick={() => selectMonth(index)}>{item}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    if (button_click === 2) {
        return (
            <div>
                <ul className="years">

                    {
                        year.map((item, index) => {
                            if (item === current_year) {
                                return (

                                    <li key={index} onClick={() => selectYear(item)} className="main_year">{item}</li>
                                )
                            }
                            else {

                                return (

                                    <li key={index} onClick={() => selectYear(item)} className="usually_year">{item}</li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        )

    }
};
export default CalendarBoard;
