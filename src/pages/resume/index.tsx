import { PageData } from "lume/core.ts";
import { Resume } from "../../_types/resume.ts";

export default ({ comp, resume }: { resume: Resume } & PageData) => {
  return (
    <>
      <section class="flex flex-col">
        <section>
          <h2 class="text-rose-800">Skills</h2>
          <img
            class="object-scale-down w-2/3 sm:mx-auto"
            src="../../static/resume_key_words.png"
          />
        </section>
        <section>
          <h2 class="text-rose-800">Experiences</h2>
          <p>
            For safety reasons, I do not mention the names of the companies I
            have worked with.
          </p>
          <table class="table-auto">
            <tbody>
              {resume?.projects?.map((project, i) => (
                <comp.ui.resume.Project project={project} key={project.name} />
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 class="text-rose-800">Education</h2>
          <table class="table-auto">
            <tbody>
              {resume?.education?.map((education, i) => (
                <comp.ui.resume.Education
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
