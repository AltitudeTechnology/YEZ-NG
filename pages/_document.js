import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          {/* Import CSS for nprogress */}
          {/* <link rel='stylesheet' type='text/css' href='/static/nprogress.css' /> */}
          <link
            rel='stylesheet'
            href='/static/fonts/segoe-ui.ttf'
          />
          <link
            rel='stylesheet'
            href='/static/fonts/nexa-bold.otf'
          />
          <link
            rel='stylesheet'
            href='/_next/static/style.css'
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
