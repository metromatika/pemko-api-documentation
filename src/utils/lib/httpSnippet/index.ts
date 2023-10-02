import { LanguagesVariant } from '@/components/organisms/Header'
import { RequestType } from '@/utils/types'

import { generateToJavascript } from './javascript'
import { generateToJavaOkHttp } from './java'
import { generateToPython } from './python'
import { generateToCurl } from './curl'
import { generateToRuby } from './ruby'
import { generateToPHP } from './php'

interface generateCodeType extends RequestType {
  languages: (typeof LanguagesVariant)[number]
}

export const generateCode = ({ languages, ...rest }: generateCodeType) => {
  switch (languages) {
    case 'curl':
      return generateToCurl(rest)
    case 'javascript':
      return generateToJavascript(rest)
    case 'java':
      return generateToJavaOkHttp(rest)
    case 'php':
      return generateToPHP(rest)
    case 'python':
      return generateToPython(rest)
    case 'ruby':
      return generateToRuby(rest)
  }
}
