import { BodyType, RequestType } from '@/utils/types'

const generateFormData = (formdata: BodyType['formdata']) => {
  const filtered = formdata?.filter((data) => data.type !== 'file')
  return filtered
    ?.map((data, index, array) => {
      const separator = index === array.length - 1 ? '' : ','
      return `\t'${data.key}': '${data.value}'${separator}`
    })
    .join('\n')
}

const headerPython = (header: RequestType['header']) => {
  return header?.map((item) => `'${item.key}': '${item.value}'`).join(', ')
}

const getFile = (formdata: BodyType['formdata']) => {
  return formdata?.filter((data) => data.type === 'file')
}

const authPython = (auth: RequestType['auth']) => {
  return auth ? `'Authorization': '${auth.type} ${auth.bearer[0].value}'` : ''
}

export const generateToPython = (request: RequestType): string => {
  const { body, method, header, url } = request

  const headers = headerPython(header as RequestType['header'])
  const authHeader = authPython(request.auth)

  if (body?.raw) {
    return `import requests
import json

url = '${url.raw}'
headers = {'Content-Type': 'application/json'${headers ? `, ${headers}` : ''}${authHeader ? `, ${authHeader}` : ''}}

payload = json.dumps(${body.raw})

response = requests.request('${method}', url, headers=headers, data=payload)
print(response.text)`
  } else if (body?.formdata) {
    return `import requests

url = '${url.raw}'
headers = {${authHeader ?? ''}${headers ? `, ${headers}, ` : ''}}

payload = ${body.formdata.length > 0 ? `{\n${generateFormData(body.formdata)}\n}` : '{}'}
files= ${
      getFile(body.formdata)?.length
        ? `[\n${getFile(body.formdata)
            ?.map((data) => `\t('${data.key}': open('${data.src}', 'rb')),`)
            .join('\n')}\n]`
        : '{}'
    }

response = requests.request('${method}', url, headers=headers, data=payload, ${
      getFile(body.formdata)?.length ? 'files=files' : ''
    }})
print(response.text)`
  } else {
    return `import requests

url = '${url.raw}'
headers = {${authHeader ?? ''}${headers ? `, ${headers}, ` : ''}}

response = requests.request('${method}', url, headers=headers)
print(response.text)`
  }
}
