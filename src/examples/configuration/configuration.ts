// https://www.reddit.com/r/typescript/comments/d8w658/dynamic_property_lookup_via_type/

interface Theme {
    type: 'ui.theme';
    flavour: 'Specular' | 'Amos' | 'Folie';
}

interface Mode {
    type: 'ui.mode';
    mode: 'dark' | 'light';
}

type SupportedLanguage = 'EO' | 'EN' | 'ZH' | 'ES'

interface Language {
    type: 'general.language';
    value: SupportedLanguage;
}

interface AutoSave {
    type: 'editor.auto-save';
    value: boolean;
    interval: number;
}

type Settings = {
    'ui.theme': Theme
    'ui.mode': Mode
    'general.language': Language
    'editor.auto-save': AutoSave
}

type Setting = Theme | Mode | Language | AutoSave


export const settingFor = <T extends keyof Settings>(id: T, settings: Setting[]) => {
    const find = settings.find(setting => setting.type === id);
    return find as Settings[T];
};

const setting = settingFor('editor.auto-save', []);
setting.value;
setting.interval;
