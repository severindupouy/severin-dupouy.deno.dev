import { ElementOf } from "../../../_types/index.ts";
import { PageData } from "lume/core.ts";
import { Resume } from "../../../_types/resume.ts";

export default (
  { education: { area, endDate, institution, startDate, studyType } }: {
    education: ElementOf<Resume["education"]>;
  } & PageData,
) => {
  return (
    <>
      <tr>
        <td>{startDate} to {endDate}</td>
        <td>{institution}</td>
        <td>{area}</td>
        <td>{studyType}</td>
      </tr>
    </>
  );
};
