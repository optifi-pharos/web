import { Container } from "@/components/home/container";
import { Paragraph } from "@/components/home/paragraph";
import { Numbers } from "@/components/home/numbers";
import Image from "next/image";
import Link from "next/link";

export const HomeComponent = () => {
  return (
    <section className="relative pt-5">
      {" "}
      <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0">
          <span
            className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 
              skew-x-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600
              blur-xl opacity-60 lg:opacity-95 lg:block hidden"
          ></span>
          <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
        </div>

        <div
          className="relative flex flex-col items-center text-center lg:text-left lg:py-8 lg:items-start
          lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
        >
          <h1 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl font-bold">
            Optimize Your Investments with
          </h1>
          <h1 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              AI Agent{" "}
            </span>
          </h1>
          <Paragraph className="mt-6">
            optiFi is an AI-powered DeFi platform that automates crypto investments based on personalized risk profiles. Deployed on Pharos, it lifts TVL while allowing users to focus on learning, free from the hassle of active portfolio management.
          </Paragraph>
          <div className="mt-5 flex flex-row gap-5 w-full justify-center lg:justify-start">
            <Link href="/generate" className="z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 text-medium rounded-large [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-warning text-warning-foreground data-[hover=true]:opacity-hover w-fit py-3 inline-flex">
              Let&apos;s Go
            </Link>
          </div>
        </div>

        <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-non lg:mx-0 mx-auto max-w-3xl">
          <Image
            src="https://newzchain.com/content/images/2024/11/Pharos-network_blockchain_funding.webp"
            alt="Hero image"
            width={2350}
            height={2359}
            className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-non max-h-96"
          />
        </div>
      </Container>
      <Numbers />
    </section>
  );
};
