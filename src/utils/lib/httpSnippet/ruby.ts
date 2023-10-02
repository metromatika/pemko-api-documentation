import { BodyType, RequestType } from '@/utils/types'

const generateFormData = (formdata: BodyType['formdata']) => {
  return formdata
    ?.map((data, index, array) => {
      const separator = index === array.length - 1 ? '' : ','
      return `\t['${data.key}', ${data.value ? `'${data.value}` : `File.open('${data.src}')`}]${separator}`
    })
    .join('\n')
}

const headerRuby = (header: RequestType['header']) => {
  return header?.map((item) => `requesttyRequestType['${item.key}'] = '${item.value}'\n`).join('')
}

const authRuby = (auth: RequestType['auth']) => {
  return auth ? `request['Authorization'] = '${auth.type} ${auth.bearer[0].value}'` : ''
}

export const generateToRuby = (request: RequestType): string => {
  const { body, method, header, url } = request

  const headers = headerRuby(header as RequestType['header'])
  const authHeader = authRuby(request.auth)

  if (body?.raw) {
    return `require 'uri'
require 'json'
require 'net/http'

url = URI('${url.raw}')
https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::${method}.new(url)
request['Content-Type'] = 'application/json'${authHeader ? `\n${authHeader}` : ''}${headers ? `\n${headers}` : ''}
request.body = JSON.dump(${body.raw})

response = https.request(request)
puts response.read_body`
  } else if (body?.formdata) {
    return `require 'uri'
require 'net/http'

url = URI('${url.raw}')
https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true${authHeader ? `\n${authHeader}` : ''}${headers ? `\n${headers}` : ''}

request = Net::HTTP::${method}.new(url)
form_data = ${body.formdata.length > 0 ? `[\n${generateFormData(body.formdata)}\n]` : '[]'}
request.set_form form_data, 'multipart/form-data'
response = https.request(request)
puts response.read_body`
  } else {
    return `require 'uri'
require 'net/http'

url = URI('${url.raw}')
https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true${authHeader ? `\n${authHeader}` : ''}${headers ? `\n${headers}` : ''}

request = Net::HTTP::${method}.new(url)
response = https.request(request)
puts response.read_body`
  }
}
