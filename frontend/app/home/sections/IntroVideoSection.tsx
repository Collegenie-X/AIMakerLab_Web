import type { HomeTextConfig } from "../types";

type IntroVideoSectionProps = {
  text: HomeTextConfig["introVideo"];
};

export function IntroVideoSection({ text }: IntroVideoSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{text.heading}</h2>
          <p className="text-lg text-gray-600">{text.subheading}</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
            <iframe
              className="h-full w-full"
              src={text.youtubeEmbedUrl}
              title={text.youtubeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}


