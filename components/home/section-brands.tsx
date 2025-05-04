import { Container } from "./container";
import { Title } from "./title";
import Image from "next/image";

const logos = [
  { name: "pharos", src: "/brands/pharos.png", width: 100, height: 60, alt: "educhain" },
  { name: "coinbase", src: "/brands/coinbase.png", width: 100, height: 60, alt: "coinbase" },
  { name: "openai", src: "/brands/openai.png", width: 100, height: 60, alt: "openai" },
];

export const SectionBrands = () => {
  return (
    <section>
      <Container className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <Title>Built with</Title>
        </div>
        <div className="flex justify-center flex-wrap gap-4">
          {logos.map((logo, key) => (
            <div
              key={key}
              className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group bg-white"
            >
              <Image
                src={logo.src}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                className="h-7 sm:h-10 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
