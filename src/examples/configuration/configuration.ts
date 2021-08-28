// https://www.reddit.com/r/typescript/comments/d8w658/dynamic_property_lookup_via_type/

interface Theme {
    type: 'ui.theme';
    value: 'Specular' | 'Amos' | 'Folie';
}

interface Mode {
    type: 'ui.mode';
    value: 'dark' | 'light';
}

type SupportedLanguage = 'EO' | 'EN' | 'ZH' | 'ES'

interface Language {
    type: 'general.language';
    value: SupportedLanguage;
}

interface AutoSave {
    type: 'editor.auto-save';
    value: {
        value: boolean;
        interval: number;
    }
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
    return find as Settings[T];  //this is a lie
};

const setting = settingFor('editor.auto-save', []);
setting.value.value;
setting.value.interval;
