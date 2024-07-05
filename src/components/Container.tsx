import Btn from "./Btn";
import Textarea from "./Textarea";

type Props = {};

export default function Container({}: Props) {
  return (
    <section className="w-full max-w-md md:max-w-2xl h-auto flex flex-col content-center items-center  justify-center md:flex-row gap-4">
     <Textarea></Textarea>
      <Btn>
       Convert to HTML
      </Btn>
      <Textarea></Textarea>
    </section>
  );
}
