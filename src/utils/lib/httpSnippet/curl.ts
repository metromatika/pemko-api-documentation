import { BodyType, HeaderType, RequestType } from '@/utils/types'

const generateFormData = (formdata: BodyType['formdata']) => {
  return formdata
    ?.map((data, index, array) => {
      const separator = index === array.length - 1 ? '' : '\\'
      return `--form '${data.key}=${data.type === 'file' ? '@' : ''}"${data.value || data.src}"' ${separator}`
    })
    .join('\n')
}

const baseCurl = (method: string, url: string) => {
  return `curl --location --request ${method} '${url}'`
}

const headerCurl = (header: HeaderType[]) => {
  return header?.map((item) => `--header '${item.key}: ${item.value}' \\\n`).join('')
}

const authCurl = (auth: RequestType['auth']) => {
  return auth ? `--header 'Authorization: ${auth.type} ${auth.bearer[0].value}'` : ''
}

export const generateToCurl = (request: RequestType): string => {
  const { body, method, url, header } = request

  const base = baseCurl(method, url.raw)
  const headers = headerCurl(header as HeaderType[])
  const auth = authCurl(request.auth)

  if (body?.raw) {
    const contentType = "\\\n--header 'Content-Type: application/json'"
    const data = `--data-raw '${body.raw}'`
    return `${base}${contentType}${auth ? ` \\\n${auth}` : ''}${headers ? ` \\\n${headers}` : ''} \\\n${data}`
  }

  if (body?.formdata) {
    const data = `${body.formdata.length > 0 ? generateFormData(body.formdata) : ''}`
    return `${base}${auth ? ` \\\n${auth}` : ''}${headers ? ` \\\n${headers}` : ''}\\\n${data}`
  }

  return `${base}${auth ? ` \\\n${auth}` : ''}${headers ? ` \\\n${headers}` : ''}`
}
