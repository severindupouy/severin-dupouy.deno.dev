import { PageData } from "lume/core.ts";
import { Resume } from "../../_types/resume.ts";

export default ({ comp, resume }: { resume: Resume } & PageData) => {
  return (
    <>
      <section class="flex flex-col">
        <p>
          For safety reasons, I do not mention the names of the companies I have
          worked with.
        </p>
        <section>
          <h2 class="spartacus-red">Experiences</h2>
          <table class="table-auto">
            <tbody>
              {resume?.projects?.map((project, i) => (
                <comp.ui.resume.project project={project} key={project.name} />
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 class="spartacus-red">Education</h2>
          <table class="table-auto">
            <tbody>
              {resume?.education?.map((education, i) => (
                <comp.ui.resume.education
                  education={education}
                  key={education.area}
                />
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};
