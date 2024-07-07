import ConverterProvider from "../providers/ConverterProvider";
import Btn from "./Btn";
import HtmlBox from "./HtmlBox";
import JsonBox from "./JsonBox";

type Props = {};

export default function Container({}: Props) {
  return (
    <section className="w-full h-full  px-5 lg:px-7 flex flex-col content-center items-center  justify-center md:flex-row gap-4">
      <ConverterProvider>
     <JsonBox type='json'></JsonBox>
      <Btn>
        Download HTML
      </Btn>
      <HtmlBox type="html"></HtmlBox>
      </ConverterProvider>
    </section>
  );
}
