import { ElementOf } from "../../../_types/index.ts";
import { PageData } from "lume/core.ts";
import { Resume } from "../../../_types/resume.ts";

export default (
  {
    project: {
      description,
      endDate,
      highlights,
      keywords,
      startDate,
    },
  }: { project: ElementOf<Resume["projects"]> } & PageData,
) => {
  return (
    <>
      <tr>
        <td>{startDate} to {endDate}</td>
        <td>{description}</td>
        <td>
          <ul>
            {keywords?.sort().map((item) => <li key={item}>{item}</li>)}
          </ul>
        </td>
        <td>
          <ul>
            {highlights?.sort().map((item) => <li key={item}>{item}</li>)}
          </ul>
        </td>
      </tr>
    </>
  );
};
