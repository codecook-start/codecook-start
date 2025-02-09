import React, { useState } from "react";

const Event = (props) => {
    const { event, current_day, current_year, current_select_month, add_event_flag, set_add_event_flag } = props;
    const [length,setLength]=useState(0);
    const eventArray = [];
    if (add_event_flag) {
        set_add_event_flag(false);
        eventArray.push(event);
        setLength(eventArray.length);
    }
    
    if (length === 0) {
        return (
            <div>
                <p className="text-center">No Events</p>
            </div>
        );
    }
    else {
        return (
            <div>
                {
                    eventArray.map((item, index) => {
                        return (
                            <p className="text-center" key={index}>{item}</p>
                        );
                    })
                }
            </div>
        );
    }

};

export default Event;
