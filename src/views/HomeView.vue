<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import _ from 'lodash'
import MiToast from '@/components/global/mi-toast'
const miToast = new MiToast()

interface ElementSelector {
  pageName: string
  urlExtension: string
  domElements: DOMElements
}

interface DOMElements {
  [key: string]: Element
}

interface Element {
  id?: string
  xpath?: string
  name?: string
}

interface reactiveInterface {
  text: string
  elementSelector: ElementSelector
}
const data = reactive<reactiveInterface>({
  text: '',
  elementSelector: {
    pageName: '',
    urlExtension: '',
    domElements: {},
  },
})

const toJson = (value: string): ElementSelector => {
  if (data.text) {
    return JSON.parse(value)
  }
  return {
    domElements: {},
    pageName: '',
    urlExtension: '',
  }
}

const checkElementName = (element: Element, domElement: string): string => {
  if (domElement.toString().includes('dropdown')) {
    return `//*[@aria-owns='${element.id}_listbox']`
  }
  if (element.name) {
    return `//*[@name='${element.name}']`
  }
  return `//*[@id='${element.id}']`
}

const convertObject = (elementSelector: ElementSelector) => {
  data.elementSelector.urlExtension = elementSelector.urlExtension
  data.elementSelector.pageName = elementSelector.pageName
  for (const domElement in elementSelector.domElements) {
    const element = elementSelector.domElements[domElement]
    data.elementSelector.domElements[_.camelCase(domElement)] = {
      id: `#${element.id ?? ''}`,
      xpath: element.xpath ? element.xpath : checkElementName(element, domElement),
    }
  }
}

const convertJsonToString = () => {
  return JSON.stringify(data.elementSelector, null, 4)
}

const copyData = () => {
  if (data.elementSelector.domElements.length) {
    navigator.clipboard.writeText(convertJsonToString())
    miToast.success()
    return
  }
  miToast.failed('Empty Data')
}
</script>

<template>
  <div class="flex flex-col space-y-4 p-10">
    <textarea v-model="data.text" class="border rounded-md"></textarea>
    <mi-button text="convert" @click="convertObject(toJson(data.text))" />
    <mi-button text="copy" @click="copyData()" />
    <div>
      <pre>
        {{ convertJsonToString() }}
      </pre>
    </div>
  </div>
</template>
