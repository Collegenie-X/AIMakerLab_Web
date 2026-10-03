export function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/==(.+?)==/g).map((part, i) =>
        i % 2 ? (
          <mark
            key={i}
            className="rounded-sm bg-transparent bg-[linear-gradient(transparent_55%,rgba(217,70,239,0.45)_55%)] px-0.5 font-semibold text-white box-decoration-clone"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
