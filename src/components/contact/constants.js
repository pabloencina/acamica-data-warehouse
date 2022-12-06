export const optionsPreference = [
    {
        value: "NO_PREFERENCE",
        label: "No Preference",
    },
    {
        value: "FAVORITE_CHANNEL",
        label: "Favorite Channel",
    },
    {
        value: "DO_NOT_DISTURB",
        label: "Don't Disturb",
    },
];

export const getPreferenceOption = (value) => {
    return optionsPreference.find((option) => option.value === value);
};

export const optionsChannel = [
    {
        value: "TWITTER",
        label: "Twitter",
    },
    {
        value: "INSTAGRAM",
        label: "Instagram",
    },
    {
        value: "FACEBOOK",
        label: "Facebook",
    },
    {
        value: "WHATSAPP",
        label: "WhatsApp",
    },
    {
        value: "PHONE",
        label: "Phone",
    },
];

export const getChannelOption = (value) => {
    return optionsChannel.find((option) => option.value === value);
};
