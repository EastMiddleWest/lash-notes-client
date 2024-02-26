import React from "react";
import styles from "./Wheel.module.scss";
import ValueElement from "./ValueElement/ValueElement";
import { useScrollStopListener } from "../../../utilities/useScrollstopListener";

import debounce from "lodash.debounce";

type WheelProps = {
  value: string;
  values: string[];
  handler: (arg: string) => void;
};

const Wheel: React.FC<WheelProps> = ({ value, values, handler }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = React.useState("");

  //console.log('Selected: ', selected)

  React.useEffect(() => {
    if (parentRef.current) {
      const index = values.indexOf(value) - 1;
      const position = index * 50;
      if(index >= 0) {
        //console.log('value: ',value,' position: ', position)
        parentRef.current.scrollTo({ top: position, behavior: "smooth" });
      }
    }
  }, [value, values]);

  const setValueOnScrollStop = () => {
    //console.log('v,s:  ',value, selected)
    if(value !== selected){
      //console.log('setValueOnScrollStop: ', selected, value)
      handler(selected)
    }
  }

  const listener = debounce(setValueOnScrollStop, 150);

  React.useEffect(()=>{
    window.addEventListener("scroll", listener)
    return () => window.removeEventListener('scroll', listener)
  },[listener])

  console.log('render wheel')

  //useScrollStopListener(parentRef.current, () => setValueOnScrollStop(), 200)

  return (
    <div
      ref={parentRef} className={styles.wheel}
      onScroll={e => console.log(e)}
      onMouseOver={e => console.log(e)}
      onDrag={e => console.log(e)}
      >
      {values.map((value, index) => (
        <ValueElement
          key={`${value}-${index}`}
          value={value}
          handler={setSelected}
          ref={parentRef}
        />
      ))}
    </div>
  );
};

export default Wheel;
