<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import _ from 'lodash'

interface ElementSelector {
  pageName: string
  urlExtension: string
  domElements: DOMElements
}

interface DOMElements {
  [key: string]: Element
}

interface Element {
  id: string
  xpath: string
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
  return {}
}

const checkElementName = (element: Element): string => {
  if (Object.keys(element)[0].toLowerCase().includes('dropdown')) {
    return `//*[@aria-owns='${qwe.id}_listbox']`
  }
  return `//*[@id='${qwe.id}']`
}

const convertObject = (elementSelector: ElementSelector) => {
  data.elementSelector.urlExtension = elementSelector.urlExtension
  data.elementSelector.pageName = elementSelector.pageName
  for (const domElement in elementSelector.domElements) {
    const element = elementSelector.domElements[domElement]
    data.elementSelector.domElements[_.camelCase(domElement)] = {
      id: element.id ?? '',
      xpath: element.id ? checkElementName(element) : element.xpath,
    }
  }
}
</script>

<template>
  <div class="flex flex-col space-y-4 p-10">
    <textarea v-model="data.text" class="border rounded-md"></textarea>
    <mi-button text="convert" @click="convertObject(toJson(data.text))" />
    <div>
      <pre>
        {{ JSON.stringify(data.elementSelector, null, 4) }}
      </pre>
    </div>
  </div>
</template>
