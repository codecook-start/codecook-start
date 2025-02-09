import React from "react";

const SelectTitle = (props) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const {current_month,current_year,button_click}=props;
    if(button_click===0)
    {
        return (
            <div>
             {month[current_month]}<br />
             <span >{current_year}</span>
            </div>
           );  
    }
    if(button_click===1)
    {
        return (
            <div> 
             <p>Select Month</p>           
             <span >{current_year}</span>
            </div>
           );
    }
    if(button_click===2)
    {
        return (
            <div>
             <p>Select Year</p>
             <span >{current_year-8}-{current_year+7}</span>
            </div>
           );
    }
  
};

export default SelectTitle;
