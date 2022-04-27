import { focusables } from '../modules/focusables'
import { Select } from './interfaces'
import { InitOptions, Options, Refs } from './types'

export default (initOptions: InitOptions): Select => ({
  ...focusables,
  $refs: {} as Refs,
  config: {
    searchable: initOptions.searchable,
    multiselect: initOptions.multiselect,
    readonly: initOptions.readonly,
    disabled: initOptions.disabled
  },
  placeholder: initOptions.placeholder,
  popover: false,
  search: '',
  selected: undefined,
  selectedOptions: [],
  options: [],
  displayOptions: [],

  init () {
    this.$watch('popover', state => {
      if (state) {
        this.$nextTick(() => {
          setTimeout(() => this.$refs.search?.focus(), 100)
        })
      }

      this.$refs.input.dispatchEvent(new Event(state ? 'open' : 'close'))
    })

    this.$watch('search', (search: string) => {
      this.displayOptions = this.searchOptions(search.toLocaleLowerCase())
    })

    this.$watch('options', (options: Options) => {
      this.displayOptions = options
    })

    this.initOptionsObserver()
    this.fillSelectedFromInputValue()
  },
  initOptionsObserver () {
    const observer = new MutationObserver(mutations => {
      const textContent = mutations[0]?.target?.textContent ?? '[]'

      this.options = JSON.parse(textContent)
    })

    const element = this.$refs.json
    this.options = JSON.parse(element.innerText)

    observer.observe(element, {
      subtree: true,
      characterData: true
    })
  },
  fillSelectedFromInputValue () {
    const inputValue = this.$refs.input.value

    if (!this.config.multiselect) {
      // eslint-disable-next-line eqeqeq
      this.selected = this.options.find(option => option.value == inputValue)

      return
    }

    try {
      this.selectedOptions = JSON.parse(inputValue).map(value => {
        // eslint-disable-next-line eqeqeq
        return this.options.find(option => option.value == value)
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  },
  searchOptions (search) {
    return this.options.filter(option => {
      const label = option.label.toLocaleLowerCase()

      return label.includes(search)
    })
  },
  togglePopover () {
    if (this.config.readonly) return

    this.popover = !this.popover

    this.$refs.input.focus()
  },
  closePopover () {
    this.popover = false
  },
  getSelectedValue () {
    if (this.config.multiselect) {
      return JSON.stringify(this.selectedOptions.map(option => option.value))
    }

    return this.selected?.value ?? ''
  },
  getSelectedDysplayText () {
    if (this.config.multiselect) return ''

    return this.selected?.label ?? ''
  },
  getPlaceholder () {
    if (this.config.multiselect && this.selectedOptions.length > 0) return ''

    return this.placeholder ?? ''
  },
  isSelected (option) {
    if (this.config.multiselect) {
      return this.selectedOptions.some(({ value }) => value === option.value)
    }

    return option.value === this.selected?.value
  },
  select (option) {
    if (this.config.readonly) return

    this.search = ''

    if (this.config.multiselect) {
      const exists = this.selectedOptions.some(({ value }) => value === option.value)

      if (exists) return this.unSelect(option)

      this.$refs.input.dispatchEvent(new CustomEvent('selected', { detail: option }))

      return this.selectedOptions.push(option)
    }

    this.selected = option.value === this.selected?.value ? undefined : option

    this.$refs.input.dispatchEvent(new CustomEvent('selected', { detail: option }))

    this.closePopover()
  },
  unSelect (option) {
    if (this.config.readonly) return

    if (this.config.multiselect) {
      const index = this.selectedOptions.findIndex(({ value }) => value === option.value)
      this.selectedOptions.splice(index, 1)
    }

    this.$refs.input.dispatchEvent(new CustomEvent('un-selected', { detail: option }))
  },
  clear () {
    this.config.multiselect
      ? this.selectedOptions = []
      : this.selected = undefined
    this.$refs.input.dispatchEvent(new Event('clear'))
  },
  isEmpty () {
    if (this.config.multiselect) {
      return this.selectedOptions.length === 0
    }

    return this.selected === undefined
  }
})
