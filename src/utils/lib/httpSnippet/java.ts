import { BodyType, RequestType } from '@/utils/types'

const generateFormData = (formdata: BodyType['formdata']) => {
  return formdata
    ?.map((data) => {
      const { key, value, src } = data
      return `\t.addFormDataPart('${key}', ${
        value
          ? `'${value}'`
          : `"${src}", RequestBody.create(MediaType.parse("application/octet-stream")), new File("${src}"))`
      })`
    })
    .join('\n')
}

const headerJava = (header: RequestType['header']) => {
  return header?.map((item) => `.addHeader('${item.key}', '${item.value}')`).join('\n')
}

const authJava = (auth: RequestType['auth']) => {
  return auth ? `.addHeader('Authorization', '${auth.type} ${auth.bearer[0].value}')` : ''
}

export const generateToJavaOkHttp = (request: RequestType): string => {
  const { body, method, url, header } = request

  const headers = headerJava(header as RequestType['header'])
  const authHeader = authJava(request.auth)

  if (body?.raw) {
    return `OkHttpClient client = new OkHttpClient().newBuilder()\n\t.build();

MediaType mediaType = MediaType.parse('application/json');
RequestBody body = RequestBody.create(mediaType, ${body.raw});

Request request = new Request.Builder()
\t.url('${url.raw}')
\t.method('${method}', body)${authHeader ? `\n\t${authHeader}` : ''}${headers ? `\n\t${headers}` : ''}
\t.build();

Response response = client.newCall(request).execute();`
  } else if (body?.formdata) {
    return `OkHttpClient client = new OkHttpClient().newBuilder()\n\t.build();

MediaType mediaType = MediaType.parse('text/plain');${
      body.formdata.length > 0
        ? `\nRequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)\n${generateFormData(
            body.formdata
          )}\n\t.build();`
        : '\nMediaType JSON = MediaType.parse("application/json; charset=utf-8");\nRequestBody body = RequestBody.create(JSON, "{}");'
    }

Request request = new Request.Builder()
\t.url('${url.raw}')
\t.method('${method}', body)${authHeader ? `\n\t${authHeader}` : ''}${headers ? `\n\t${headers}` : ''}
\t.build();

Response response = client.newCall(request).execute();`
  } else {
    return `OkHttpClient client = new OkHttpClient().newBuilder()\n\t.build();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "");

Request request = new Request.Builder()
\t.url('${url.raw}')
\t.method('${method}', body)${authHeader ? `\n\t${authHeader}` : ''}${headers ? `\n\t${headers}` : ''}
\t.build();

Response response = client.newCall(request).execute();`
  }
}
