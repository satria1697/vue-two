<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import _ from 'lodash'
import MiToast from '@/components/global/mi-toast'
import { DOMElementSelector, ElementSelector } from '@/entities/json-element'

const miToast = new MiToast()

interface reactiveInterface {
  text: string
  converted: string
  elementSelector: ElementSelector
}
const data = reactive<reactiveInterface>({
  text: '',
  converted: '',
  elementSelector: {
    isUpdated: true,
    pageName: '',
    urlExtension: '',
    keyDomElementName: '',
    domElements: {},
  },
})

const checkValue = (element: DOMElementSelector) => {
  return `\t return cy.get('#${element.id ?? ''}')\n`
}

const convertObject = (elementSelector: ElementSelector) => {
  data.converted = ''
  data.converted += `class ${_.upperFirst(_.camelCase(elementSelector.pageName))} {\n`
  for (const domElement in elementSelector.domElements) {
    const element = elementSelector.domElements[domElement]

    data.converted += `${_.camelCase(domElement)}() {\n`
    data.converted += checkValue(element)
    data.converted += '}\n'
    data.converted += '\n'
  }
  data.converted += `}`
}

const toJson = (value: string): ElementSelector => {
  if (data.text) {
    return JSON.parse(value)
  }
  return {
    pageName: '',
    isUpdated: true,
    keyDomElementName: '',
    urlExtension: '',
    domElements: {},
  }
}

const copyData = () => {
  if (data.converted) {
    navigator.clipboard.writeText(data.converted)
    miToast.success()
    return
  }
  miToast.failed('Empty Data')
}
</script>

<template>
  <div class="flex flex-col space-y-4 p-10">
    <textarea v-model="data.text" rows="5" class="border rounded-md"></textarea>
    <mi-button text="convert" @click="convertObject(toJson(data.text))" />
    <mi-button text="copy" @click="copyData()" />
    <pre>
        {{ data.converted }}
      </pre
    >
  </div>
</template>
