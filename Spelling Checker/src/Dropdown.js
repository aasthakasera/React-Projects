import "./App.css";
import { useState } from "react";

export const Dropdown = (props) => {
  const items = props.list;
  const text = props.text;
  const title = props.title;
  const setText = props.setText;
  const offset = props.offset;
  const length = props.length;
  const [showItems, setShowItems] = useState(false);
  const toggle = () => {
    setShowItems(!showItems);
  };

  const selectItem = (item) => {
    setShowItems(false);
    const textOffset = text.substring(0, offset); //console.log(textOffset);
    const textOffsetSecond = text.substring(offset+length); //console.log(textOffsetSecond);
    const textValue = textOffset+item; //console.log(textValue, textValue.length);
    const value = textValue + textOffsetSecond; //console.log('value : ',value);
    setText(value);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={toggle}>
        {title}
      </div>
      {showItems && (
        <div className="dropdown-content">
          {items.map((item) => (
            <div className="dropdown-item" onClick={(e) => {
                selectItem(item);
                setShowItems(false);
            }}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
