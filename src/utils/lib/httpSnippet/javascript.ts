import { RequestType } from '@/utils/types'

const fetchJS = (url: string) => {
  return `fetch('${url}', requestOptions)
\t.then((response) => response.json())
\t.then((result) => console.log(result))
\t.catch((error) => console.log('error', error))`
}

const headerJS = (header: RequestType['header']) => {
  const baseHeader = 'const myHeaders = new Headers()\n'
  const headers = header?.map((item) => `myHeaders.append('${item.key}', '${item.value}')\n`).join('')
  return `${baseHeader}${headers}`
}

const authJS = (auth: RequestType['auth']) => {
  return auth ? `myHeaders.append('Authorization', '${auth.bearer[0].value}')\n` : ''
}

const requestJS = (method: RequestType['method'], headers: boolean, body: boolean) => {
  return `const requestOptions = {\n\tmethod: '${method}'${headers ? ',\n\theaders: myHeaders' : ''}${
    body ? ',\n\tbody: data' : ''
  }\n}`
}

const generateFormData = (formdata: RequestType['body']['formdata']) => {
  const base = 'const formdata = new FormData()\n'
  const data = formdata
    ?.map((data) => {
      const { key, type, value, src } = data
      return `formdata.append('${key}', ${type === 'file' ? 'fileInput.files,' : ''} '${value || src}')`
    })
    .join('\n')
  return `${base}${data}`
}

export const generateToJavascript = (request: RequestType): string => {
  const { header, url, method, body } = request
  const headers = headerJS(header)
  const auth = authJS(request.auth)
  const fetch = fetchJS(url.raw)

  if (body?.raw) {
    const contentType = 'myHeaders.append("Content-Type", "application/json");'
    const data = `const data = JSON.stringify(${body.raw})`
    return `${headers ?? ''}${auth ?? ''}${contentType}\n\n${data}\n\n${requestJS(
      method,
      headers ? true : false,
      body.raw ? true : false
    )}\n\n${fetch}`
  }

  if (body?.formdata) {
    const data = body.formdata.length > 0 ? `\n${generateFormData(body.formdata)}` : ''
    return `${headers ?? ''}${auth ?? ''}\n${requestJS(
      method,
      headers ? true : false,
      data ? true : false
    )}\n${data}\n\n${fetch}`
  }

  return `${headers ?? ''}${auth ? `${auth}\n` : ''}${requestJS(method, headers ? true : false, false)}\n\n${fetch}`
}
