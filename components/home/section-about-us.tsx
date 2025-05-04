import Image from "next/image";
import { CardInfo } from "./card-info";
import { Container } from "./container";
import { Paragraph } from "./paragraph";
import { Title } from "./title";

export const SectionAboutUs = () => {
  return (
    <section id="about-us">
      <Container className="flex flex-col md:flex-row gap-10 lg:gap-12 items-center">
        <div className="w-full md:w-5/12 lg:w-1/2">
          <div className="w-full h-80 sm:h-96 relative">
            <Image
              src="/agent.jpeg"
              className="w-full h-full object-cover rounded-3xl shadow-lg relative z-10"
              alt="About Our Mission"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col">
          <div className="flex flex-col gap-2">
            <Title>About optiFi</Title>
            <Paragraph>
              Built on Pharos, optiFi automates crypto investing so users can focus on learning—while AI handles everything else.
            </Paragraph>
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            <CardInfo
              title="Mission"
              description="Empower users with AI-driven tools to grow wealth effortlessly."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </CardInfo>
            <CardInfo
              title="Vision"
              description="Redefine DeFi with automation, simplicity, and intelligence."
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </CardInfo>
          </div>
        </div>
      </Container>
    </section>
  );
};
