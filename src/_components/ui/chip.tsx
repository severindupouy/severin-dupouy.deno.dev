import { PageData } from "lume/core.ts";

export default ({ text }: { text: string } & PageData) => {
  return (
    <>
      <div class="p-2 border border-light-50">{text}</div>
    </>
  );
};
