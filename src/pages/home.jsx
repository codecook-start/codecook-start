import Avatar from "../components/Avatar";
import logo from "../images/logo/brand.jpg";
import loginImg from '../images/logo/user.jpg'
import backImg from "../images/cards/background.png";
import calendatImg from "../images/cards/background1.jpg"
import { useNavigate } from "react-router-dom";
import CalendarBoard from "../components/calendarBoard";
import { useState, useRef } from "react";
import Timer from "../components/timer";
import Event from "../components/Event";
import SelectTitle from "../components/selectTitle";
const Home = () => {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month_day_usually = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const month_day_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  let today_day = today.getDate();
  let today_year = today.getFullYear();
  let today_month = today.getMonth();
  const [current_month, set_current_month] = useState(today_month);
  const [current_year, set_current_year] = useState(today_year);
  const [current_day, set_current_day] = useState(today_day);
  const [button_click, set_button_click] = useState(0);
  const [show_button, set_show_button] = useState(true);
  const [current_select_month, set_current_select_month] = useState(today_month);
  const [event,setEvent]=useState("");
  const [add_event_flag,set_add_event_flag]=useState(false);
  const downBoardElement = useRef();
  const navigate = useNavigate();
  let hide = "hide"
  const goLogin = () => {
    navigate("/login");
  };
  //what day is today?
  const start_week_today = () => {
    const current_date = new Date(today_year, today_month, 1);
    let start_week = current_date.getDay();
    return weekName[start_week];
  }
  //perv button action
  const prevMonth = () => {
    if (button_click === 0) {

      if (current_month === 0) {

        set_current_year(current_year - 1);
        set_current_month(11);
      }
      else {

        set_current_month(current_month - 1);
      }
    }
    if (button_click === 2) {
      set_current_year(current_year - 10);
    }
  }
  //next button action
  const nextMonth = () => {
    if (button_click === 0) {

      if (current_month === 11) {
        set_current_year(current_year + 1);
        set_current_month(0);
      }
      else {

        set_current_month(current_month + 1);
      }
    }
    if (button_click === 2) {
      set_current_year(current_year + 10);
    }

  }
  //Is selected year is leap year? 4,100,400...  
  const isLeap_year = (year) => {

    if (year % 4 === 0) {

      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        }
        else {
          return false;
        }
      }
      else {

        return true;
      }
    }
    else {
      return false;
    }
  }
  //2001.1.1 ---Monday-- howmany leap years are there from 2001.1.1 to selected month.
  const howMany_leap_year = (year) => {
    let count = Math.floor((year - 2001) / 4 - (year - 2001) / 100 + (year - 2001) / 400);
    return count;
  }
  //howmany days....
  const howMany_day = (year, month) => {
    let day_count = 0;
    let count_leap_year = howMany_leap_year(year);
    let count_usually_year = year - 2001 - count_leap_year;
    let count_month = month - 1;
    if (isLeap_year(year)) {

      for (let i = 0; i <= count_month; i++) {
        day_count += month_day_leap[i];
      }


    }
    else {
      for (let i = 0; i <= count_month; i++) {
        day_count += month_day_usually[i];

      }
    }
    let count_day = 365 * count_usually_year + 366 * count_leap_year + day_count;
    return count_day;

  }
  //what day is selected month -1day?
  const start_week_day = () => {
    const current_date = new Date(current_year, current_month, 1);
    let start_week = current_date.getDay();
    return start_week;
  }
  //Is selected is today?
  const isCurrent = () => {
    if (current_month === today_month && current_year === today_year) {
      return true;
    }
    else {
      return false;
    }
  }
  //selected month action
  const select_month = () => {
    if (button_click === 2) {
      set_button_click(2);
    }
    else {
      set_button_click(button_click + 1);
    }

  }
  //set Today
  const setToday = () => {
    set_current_year(today_year);
    set_current_month(today_month);
    set_button_click(0);
  }
  //what day is selected day?
  const start_week_day_selected = () => {
    const current_info = new Date(current_year, current_select_month, current_day);
    let start_week = current_info.getDay();
    return start_week;
  }
  const is_current_today = () => {
    if (current_day === today_day && current_month === today_month && current_year === today_year) {
      let result = true;
      return result;
    }
    else {
      let result = false;
      return result;
    }
  }
  const show_hide_button = () => {
    if (hide === "hide") {
      hide = "show";
      downBoardElement.current.className = "hide";
    }
    else {
      hide = "hide";
      downBoardElement.current.className = "bg-black down-board";
    }

  }
  const AddEvent = (e) => {
    if (e.key === "Enter") {
      if(e.target.value!=="")
      {
        set_add_event_flag(true);
        setEvent(e.target.value);
      }     
    }
  }
  return (
    <div className=" mx-auto">
      <div className="flex-grow">
        <div className="flex header w-max">
          <div className="logo rounded-full">
            <Avatar
              size="large"
              src={<img className="rounded-full" src={logo} alt="logo" />}
            />
          </div>
          <div className="menu">
            <div className="user-menu">
              <Avatar
                size="large"
                onClick={goLogin}
                src={<img className="rounded-full" src={loginImg} alt="logo" />}
              />
            </div>
          </div>
        </div>
        <div className="home-img h-[800px] flex">
          <img src={backImg} alt="backimage" />
          <div>
            <div className="calendar_body">
              <div className="time_zone" onClick={() => setToday()}>
                <Timer />
                <p className="text-center today_display">{start_week_today()},{month[today_month]}, {today_day}, {today_year}</p>
              </div>
              <div className="month">

                <ul>
                  <li className="prev" onClick={() => prevMonth()}>&#10094;</li>
                  <li className="next" onClick={() => nextMonth()}>&#10095;</li>
                  <li onClick={() => select_month()}>
                    <SelectTitle current_month={current_month} current_year={current_year} button_click={button_click} />
                  </li>
                </ul>
              </div>
              <CalendarBoard current_year={current_year} set_current_year={set_current_year} current_month={current_month} set_current_month={set_current_month} start_week_day={start_week_day()} isLeap_year={isLeap_year(current_year)} isCurrent={isCurrent()} today_day={today_day} button_click={button_click} set_button_click={set_button_click} current_day={current_day} set_current_day={set_current_day} current_select_month={current_select_month} set_current_select_month={set_current_select_month} />
              <div className="bg-black down-board" ref={downBoardElement}>
                <p className="text-center text-white">
                  {is_current_today() ? `Today` : ` ${weekName[start_week_day_selected()]},${current_day}`}
                </p>
                <div className="tooltip">
                  <p class="ex3"><input className="input-event" placeholder="Add an event or reminder  " onKeyDown={(e) => AddEvent(e)}></input> </p>
                  <span class="tooltiptext">Press Enter to add event</span>
                </div>
                <div className="noEvent text-center"><Event event={event} current_day={current_day} current_year={current_year} current_select_month={current_select_month} add_event_flag={add_event_flag} set_add_event_flag={set_add_event_flag}/></div>
              </div>
              <div className="bg-black button-board">
                <button className="show_button" onClick={() => show_hide_button()}>{show_button ? "Hide" : "Show"}Agenda</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
