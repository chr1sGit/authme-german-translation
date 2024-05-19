import { localeEN } from "@utils/language/en"
import { localeHU } from "@utils/language/hu"
import { localeES } from "@utils/language/es"
import { localeFR } from "@utils/language/fr"
import { localeRU } from "@utils/language/ru"
import { localeDE } from "@utils/language/de"


export const getLanguage = () => {
	const language = navigator.language

	if (language.startsWith("es")) {
		return localeES
	} else if (language.startsWith("hu")) {
		return localeHU
	} else if (language.startsWith("fr")) {
		return localeFR
	} else if (language.startsWith("ru")) {
		return localeRU
	} else if (language.startsWith("de")) {
		return localeDE
	} else {
		return localeEN
	}
}
