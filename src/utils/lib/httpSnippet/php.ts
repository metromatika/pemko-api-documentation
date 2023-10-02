import { BodyType, RequestType } from '@/utils/types'

const generateFormData = (formdata: BodyType['formdata']) => {
  return formdata
    ?.map((data) => `'${data.key}' => ${data.value ? `'${data.value}'` : `new CURLFILE('${data.src}')`}`)
    .join(', ')
}

const headerPHP = (header: RequestType['header']) => {
  return header?.map((item) => `'${item.key}: ${item.value}'`).join(', ')
}

const authPHP = (auth: RequestType['auth']) => {
  return auth ? `'Authorization: ${auth.type} ${auth.bearer[0].value}'` : ''
}

export const generateToPHP = (request: RequestType): string => {
  const { body, header, method, url, auth } = request

  const headers = headerPHP(header as RequestType['header'])
  const authHeader = authPHP(auth)

  if (body?.raw) {
    return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
\tCURLOPT_URL => '${url.raw}',
\tCURLOPT_RETURNTRANSFER => true,
\tCURLOPT_ENCODING => '',
\tCURLOPT_MAXREDIRS => 10,
\tCURLOPT_TIMEOUT => 0,
\tCURLOPT_FOLLOWLOCATION => true,
\tCURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
\tCURLOPT_CUSTOMREQUEST => '${method}',
\tCURLOPT_POSTFIELDS => '${body.raw}',
\tCURLOPT_HTTPHEADER => array('Content-Type: application/json'${authHeader ? `, ${authHeader}, ` : ''}${
      headers ? `, ${headers}, ` : ''
    }),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;`
  } else if (body?.formdata) {
    return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
\tCURLOPT_URL => '${url.raw}',
\tCURLOPT_RETURNTRANSFER => true,
\tCURLOPT_ENCODING => '',
\tCURLOPT_MAXREDIRS => 10,
\tCURLOPT_TIMEOUT => 0,
\tCURLOPT_FOLLOWLOCATION => true,
\tCURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
\tCURLOPT_CUSTOMREQUEST => '${method}',${
      body.formdata.length > 0 ? `\n\tCURLOPT_POSTFIELDS => array(${generateFormData(body.formdata)}),` : ''
    }${headers ? `\n\tCURLOPT_HTTPHEADER => array(${headers}),` : ''}${
      authHeader ? `\n\tCURLOPT_HTTPHEADER => array(${authHeader}),` : ''
    }
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;`
  } else {
    return `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
\tCURLOPT_URL => '${url.raw}',
\tCURLOPT_RETURNTRANSFER => true,
\tCURLOPT_ENCODING => '',
\tCURLOPT_MAXREDIRS => 10,
\tCURLOPT_TIMEOUT => 0,
\tCURLOPT_FOLLOWLOCATION => true,
\tCURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
\tCURLOPT_CUSTOMREQUEST => '${method}',${headers ? `\n\tCURLOPT_HTTPHEADER => array(${headers}),` : ''}${
      authHeader ? `\n\tCURLOPT_HTTPHEADER => array(${authHeader}),` : ''
    }
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;`
  }
}
