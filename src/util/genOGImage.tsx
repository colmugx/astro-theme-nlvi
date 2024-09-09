import type { Font, FontWeight } from 'satori'
import satori from 'satori'

interface OGImageProps {
  title: string
  color: string
  author?: string
}

const cache: { [key: string]: any } = {}

function OGImage({ title, color, author }: OGImageProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#fdfeff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '52px',
          borderTop: '8px solid ' + color,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 8,
          width: 128,
          height: 44,
          backgroundColor: color,
        }}
      />
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: 64 }}>
          <p
            style={{
              lineHeight: 1,
              fontSize: 68,
              fontWeight: 'bold',
              overflow: 'hidden',
            }}
          >
            {title}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            right: 64,
          }}
        >
          {author && (
            <p
              style={{
                fontSize: 24,
                color: 'rgb(156 163 175)',
                overflow: 'hidden',
              }}
            >
              @{author}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export async function genOGImage(props: OGImageProps) {
  return satori(<OGImage {...props} />, {
    width: 800,
    height: 400,
    fonts: await loadGoogleFont(),
  })
}

async function loadGoogleFont() {
  const source = 'https://fonts.font.im/css2?family=Noto+Sans+SC:wght@100..900&display=swap'

  const css = await (
    await fetch(source, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const fontFaceRegex = /@font-face\s*{[^}]+}/g
  const fontFamilyRegex = /font-family:\s*['"]([^'"]+)['"]/
  const fontWeightRegex = /font-weight:\s*(\d+)/
  const srcRegex = /src:\s*url\(([^)]+)\)/

  const fontFaces = css.match(fontFaceRegex) || []

  const output: Font[] = []

  for (const fontFace of fontFaces) {
    const fontFamilyMatch = fontFace.match(fontFamilyRegex)
    const fontWeightMatch = fontFace.match(fontWeightRegex)
    const srcMatch = fontFace.match(srcRegex)

    let data
    if (cache[fontFace]) {
      data = cache[fontFace]
    } else {
      const d = await (await fetch(srcMatch![1])).arrayBuffer()
      cache[fontFace] = d
      data = d
    }
    if (fontWeightMatch && (fontWeightMatch[1] === '400' || fontWeightMatch[1] === '700')) {
      output.push({
        name: fontFamilyMatch![1],
        weight: parseInt(fontWeightMatch![1], 10) as FontWeight,
        data,
      })
    }
  }

  return output
}
