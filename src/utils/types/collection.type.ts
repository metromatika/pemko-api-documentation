interface BearerTokenType {
  key: string
  value: string
  type: string
}

interface FormdataItemType {
  key: string
  value: string
  type: string
  src?: string
}

interface QueryType {
  key: string
  value: string
}

interface AuthType {
  type: string
  bearer: BearerTokenType[]
}

interface UrlType {
  raw: string
  host: string[]
  path: string[]
  query?: QueryType[]
}

export interface HeaderType {
  key: string
  value: string
  type: string | null
}

export interface BodyType {
  mode: string
  formdata: FormdataItemType[] | null
  raw: string | null
}

export interface ResponseType {
  name: string
  originalRequest: {
    method: string
    header: HeaderType[]
    body: BodyType
    url: UrlType
  }
  status: string
  code: number
  _postman_previewlanguage: string
  header: HeaderType[]
  cookie: string[]
  body: string
}

export interface RequestType {
  auth: AuthType | null
  method: string
  header: HeaderType[] | null
  body: BodyType
  url: UrlType
  description: string
}

export interface ItemType {
  name: string
  item: ItemType[] | null
  request: Request | null
  response: ResponseType[] | null
  description: string | null
}

interface InfoType {
  _postman_id: string
  name: string
  description?: string
}

export interface PostmanCollection {
  info: InfoType
  item: ItemType[]
}

export interface CollectionType {
  id: string
  user_id: string
  project_name: string
  access_type: string
  json_file: PostmanCollection
}

export interface CollectionPaginationType {
  length: number
  current_page: number
  per_page: number
  total: number
  data: CollectionType[]
}

export interface CollectionResponseType {
  message: string
  data: CollectionPaginationType
}

export interface CollectionCreateField {
  project_name: string
  access_type: { value: string; label: string }
  json_file: File[]
  source_code?: File[]
}

export interface CollectionUpdateField {
  collectionId: string
  project_name: string
  access_type: { value: string; label: string }
  json_file: File[]
}
