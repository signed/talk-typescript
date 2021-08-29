// https://www.reddit.com/r/typescript/comments/d8w658/dynamic_property_lookup_via_type/
import { AutoSave } from './settings/auto-save'
import { Language } from './settings/language'
import { Mode } from './settings/mode'
import { Theme } from './settings/theme'

type Setting = Theme | Mode | Language | AutoSave
type SettingIdentifier = Setting['type']

type Settings = {
  'ui.theme': Theme
  'ui.mode': Mode
  'general.language': Language
  'editor.auto-save': AutoSave
}

export const settingFor = <T extends keyof Settings>(id: T, settings: Setting[]) => {
  const find = settings.find((setting) => setting.type === id)
  return find as Settings[T] //this is a lie
}

const autoSave = settingFor('editor.auto-save', [])
autoSave.value.value
autoSave.value.interval

const uiMode = settingFor('ui.mode', [])
uiMode.value

type SettingsWithDefault = 'general.language' | 'ui.mode'
type Defaults = {
  [Property in keyof Settings as Extract<Property, SettingsWithDefault>]: Settings[Property]['value']
}

const defaults: Defaults = {
  'general.language': 'EN',
  'ui.mode': 'dark',
}

type SettingsReturn<T extends SettingIdentifier> = T extends keyof Defaults ? Settings[T] : Settings[T] | undefined
declare function settingFantasyFor<T extends keyof Settings>(id: T, settings: Setting[]): SettingsReturn<T>

var lang = settingFantasyFor('general.language', [])
var auto = settingFantasyFor('editor.auto-save', [])
