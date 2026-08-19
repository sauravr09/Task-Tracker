import type {Theme, UserSettings} from '../types/settings';

const STORAGE_KEY = "userSettings";

function getPreferedTheme(): Theme { 
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) { 
    document.documentElement.setAttribute("data-theme", theme);
}

const defaultSettings: UserSettings = {theme: getPreferedTheme()};
const listeners = new Set<() => void>();

export function loadSettings(): UserSettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? {...defaultSettings, ...JSON.parse(stored)} : defaultSettings;
    }
    catch{
        return defaultSettings; 
    }
}

let settings: UserSettings = loadSettings();
applyTheme(settings.theme)


export function getSettings(): UserSettings { 
    return settings;
}

function persists(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    applyTheme(settings.theme)
    listeners.forEach(listener => listener());
}

export function updateSettings(patch: Partial<UserSettings>){
    settings = {...settings, ...patch}
    persists()
}   

export function setTheme(theme: Theme) { 
    updateSettings({theme});
}

export function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener); 
}