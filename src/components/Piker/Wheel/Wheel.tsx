import React from "react";
import styles from "./Wheel.module.scss";
import ValueElement from "./ValueElement/ValueElement";
import { useScrollStopListener } from "../../../utilities/useScrollstopListener";

type WheelProps = {
  value: string;
  values: string[];
  handler: (arg: string) => void;
};

const Wheel: React.FC<WheelProps> = ({ value, values, handler }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const [selected, setSelected] = React.useState("");

  React.useEffect(() => {
    if (parentRef.current) {
      const index = values.indexOf(value) - 1;
      const position = index * 50;
      if(index >= 0) parentRef.current.scrollTo({ top: position, behavior: "smooth" });
    }
  }, [value, values]);

  const setValueOnScrollStop = () => {
    handler(selected)
  }

  useScrollStopListener(parentRef.current, () => setValueOnScrollStop(), 100)

  return (
    <div ref={parentRef} className={styles.wheel}>
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