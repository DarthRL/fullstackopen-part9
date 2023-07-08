import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>background material {coursePart.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>required skills: {coursePart.requirements.reduce((a, b) => a + ', ' + b)}</p>
        </div>
      );
  }
};

export default Part;
