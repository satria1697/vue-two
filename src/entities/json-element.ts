export interface ElementSelector {
  pageName: string
  urlExtension: string
  keyDomElementName: string
  isUpdated?: boolean
  domElements: DOMElements
}

export interface DOMElements {
  [key: string]: DOMElementSelector
}

export interface DOMElementSelector {
  id?: string
  xpath?: string
  name?: string
}
