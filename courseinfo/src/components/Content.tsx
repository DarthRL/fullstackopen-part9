import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((c, i) => (
        <Part key={i} coursePart={c}/>
      ))}
    </div>
  );
};

export default Content;
