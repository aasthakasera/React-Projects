import React from 'react';

const ButtonContainer = (props) => {
    return (
        <div className="btn-container">
          {props.jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => {props.action(index)}}
                className={`job-btn ${index === props.value && "active-btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>
    );
}

export default ButtonContainer;


