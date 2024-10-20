import type { SharedValue } from "react-native-reanimated";
import { findByProps } from "@vendetta/metro";

// type PropIntellisense<P extends string | symbol> = Record<P, any> & Record<PropertyKey, any>;
// type PropsFinder = <T extends string | symbol>(...props: T[]) => PropIntellisense<T>;

// type Format<T extends (args: any) => any> = (a: keyof Parameters<T> ) => string;
// type FormattableMessage<D, T extends (...args: any) => any> = ({ message: D; hasMarkdown: false; intlMessage: {  }; format: Format<T> });

/* message (?)
    LABEL_WITH_ONLINE_STATUS:
    {
        message: string,
        hasMarkdown: false,
        intlMessage: { format: [Function] }
    },
*/

type Messages = any;

/** Internationalization module for handling language localization. */
type i18nModule = {
    _events: { newListener: () => unknown; locale: () => unknown };
    _eventsCount: number;
    _maxListeners: number | undefined;
    loadPromise: Promise<void>;
    /** Called after changing language */
    resolveLanguageLoaded: () => void;
    _languages: { name: string; englishName: string; code: string; postgresLang: string; enabled: boolean }[];
    _chosenLocale: string;
    _getParsedMessages: () => unknown;
    _handleNewListener: () => unknown;
    initialLanguageLoad: { [key: string]: unknown };
    _provider: { [key: string]: unknown };
    Messages: Messages;
    _getMessages: () => Promise<
        Partial<{ [key in keyof Messages]: string }> & { default: { [key in keyof Messages]: string } }
    >;
    _requestedLocale: string;
};

type LazyActionSheetModule = {
    hideActionSheet: () => void;
    openLazy: (component: Promise<React.Component>, name: string, props: { [key: string]: any }) => void;
};

/** Discord ID */
export type Snowflake = `${bigint}`;

// TODO
type Message = any;

export interface MediaAttachment {
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width: number;
    height: number;
    content_type: string;
    content_scan_version: number;
    placeholder: string;
    placeholder_version: number;
    spoiler: boolean;
}

export interface Media {
    uri: string;
    messageId: string;
    guildId: string | null;
    channelId: string;
    filename: string;
    mediaIndex: number;
    width: number;
    height: number;
    sourceURI: string;
    description: string | undefined;
    accessoryType: string;
    spoiler: boolean;
    flags: number | undefined;
    obscure: boolean;
    contentScanVersion: number;
    mediaViewIndex: number | undefined;
}

export type EmbedMedia = Media & {
    embedProviderName?: string;
    embedURI?: string;
    noCarousel?: boolean;
};

export interface SelectedMediaSource {
    index: SharedValue<number>;
    sources: EmbedMedia[][];
    zoomed: SharedValue<unknown>;
    useThumbnailsProps: () => unknown;
    useViewerProps: () => unknown;
}

type MediaModule = {
    /**
     * Download a media asset from it's URL, saves to gallery.
     * @param url The URL to the media asset to download
     * @param gif Should be 0 if the asset is not a GIF, and 1 otherwise, case uses of any other value are undocumented
     */
    downloadMediaAsset: (url: string, gif: number) => void;
    extractMediaFromAttachment: (
        attachment: MediaAttachment,
        message: Message,
        number: number,
        guildId?: Snowflake,
    ) => Media;
    extractMediaFromEmbed: unknown;
    extractMediaSourcesFromEmbed: unknown;
    extractMediaSourcesFromMessage: unknown;
    flattenSource: unknown;
    getSelectedMediaSource: () => SelectedMediaSource;
    getYoutubeVideoIdFromURI: (URI: string) => string;
    isThumbnailAttachment: unknown;
    messageContainsMedia: unknown;
    setMediaSourcePortal: unknown;
    useSelectedMediaSource: (a: SelectedMediaSource) => [number, EmbedMedia];
};

/*
type byProps<T extends (string | symbol)[]> =
    T extends (keyof i18nModule)[] ? i18nModule :
    T extends (keyof LazyActionSheetModule)[] ? LazyActionSheetModule :
    T extends (keyof MediaModule)[] ? MediaModule :
    { [K in T[number]]: PropIntellisense<K>; }
*/

export default {
    MediaModule: findByProps("downloadMediaAsset", "extractMediaFromEmbed") as MediaModule,
    LazyActionSheetModule: findByProps("hideActionSheet", "openLazy") as LazyActionSheetModule,
    i18nModule: findByProps("resolveLanguageLoaded", "Messages") as i18nModule,
};
